const { model } = require('../config/gemini');

/**
 * Detects the language and intent of the user message
 */
const analyzeMessage = async (messageText) => {
  try {
    const prompt = `
    Analyze the following message from a customer to an e-commerce store.
    Message: "${messageText}"
    
    Return a JSON object with exactly these fields:
    - "language": the detected language (e.g., "tamil", "english", "hindi")
    - "intent": one of ["product_inquiry", "price_check", "order_status", "greeting", "complaint", "other"]
    - "is_complex": true if the customer sounds angry, confused, or is asking for something very custom that might need human intervention, false otherwise.
    
    Do not return any markdown formatting, only the raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean up markdown if Gemini returned it despite instructions
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error analyzing message:', error);
    return { language: 'english', intent: 'other', is_complex: false };
  }
};

module.exports = { analyzeMessage };
