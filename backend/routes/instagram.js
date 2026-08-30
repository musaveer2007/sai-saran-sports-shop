const express = require('express');
const router = express.Router();

// Instagram verification and webhooks are similar to WhatsApp
// They both use the Meta Graph API

router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) { // Sharing same verify token for simplicity
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post('/webhook', async (req, res) => {
  // Logic here is similar to WhatsApp but payload structure differs slightly for IG
  console.log('Instagram Webhook received', req.body);
  res.sendStatus(200);
});

module.exports = router;
