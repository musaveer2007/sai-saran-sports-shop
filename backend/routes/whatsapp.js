const express = require('express');
const router = express.Router();
const axios = require('axios');
const { analyzeMessage } = require('../services/language-detector');
const { generateResponse } = require('../services/ai-chatbot');
const { twilioClient } = require('../config/twilio');
const { supabase } = require('../config/supabase');

const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Webhook Verification (Meta requires this)
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming messages
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages && change.value.messages[0]) {
            const message = change.value.messages[0];
            const customerPhone = message.from;
            const messageText = message.text ? message.text.body : '';
            
            if (!messageText) continue; // Ignore non-text for now
            
            // Assume we identify the business based on the phone number ID
            // In multi-tenant, query DB for business with this WhatsApp number
            // Hardcoded fallback for now:
            const { data: business } = await supabase
              .from('businesses')
              .select('*')
              .limit(1)
              .single();
              
            if (!business) continue;
            
            // 1. Analyze message (Intent, Language, Complexity)
            const analysis = await analyzeMessage(messageText);
            
            // 2. Generate AI Reply
            const botReply = await generateResponse(business.id, messageText, analysis, business);
            
            // 3. Send reply back to WhatsApp
            await axios({
              method: 'POST',
              url: `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
              headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
              data: {
                messaging_product: 'whatsapp',
                to: customerPhone,
                type: 'text',
                text: { body: botReply }
              }
            });
            
            // 4. Log in database
            await supabase.from('whatsapp_messages').insert([{
              business_id: business.id,
              from_number: customerPhone,
              to_number: 'BOT',
              message_type: 'text',
              message_body: messageText,
              direction: 'inbound',
              intent_detected: analysis.intent,
              language_detected: analysis.language
            }]);
            
            // 5. Escalate if complex
            if (analysis.is_complex && twilioClient && process.env.OWNER_PHONE_NUMBER) {
              await twilioClient.calls.create({
                url: 'http://demo.twilio.com/docs/voice.xml', // Placeholder voice TwiML
                to: process.env.OWNER_PHONE_NUMBER,
                from: process.env.TWILIO_PHONE_NUMBER
              });
              console.log('Escalation call triggered');
            }
          }
        }
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
