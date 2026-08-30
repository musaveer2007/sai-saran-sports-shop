require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioClient;

try {
  if (accountSid && authToken) {
    twilioClient = twilio(accountSid, authToken);
  } else {
    console.warn('⚠️ Twilio credentials not found in .env, voice escalation will not work');
  }
} catch (error) {
  console.error('Error initializing Twilio:', error);
}

module.exports = { twilioClient };
