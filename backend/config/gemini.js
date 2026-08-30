require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ Gemini API Key not found in .env');
}

const genAI = new GoogleGenerativeAI(apiKey || 'AIza...');

// Use the recommended flash model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

module.exports = { genAI, model };
