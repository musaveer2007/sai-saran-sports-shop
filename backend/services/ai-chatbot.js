const { model } = require('../config/gemini');
const { searchKnowledgeBase } = require('./knowledge-base');
const { checkStock } = require('./stock-checker');

/**
 * Main AI Chatbot logic to generate a response
 */
const generateResponse = async (businessId, customerMessage, analysisContext, businessDetails) => {
  try {
    // 1. Fetch relevant data
    const stockData = await checkStock(businessId, customerMessage);
    const kbData = await searchKnowledgeBase(businessId, customerMessage);
    
    // 2. Build the system prompt
    const systemPrompt = `
    You are an AI assistant for an e-commerce store named "${businessDetails.business_name || 'Our Store'}".
    Your goal is to be helpful, polite, and assist the customer with their queries, purchases, and support.
    
    LANGUAGE: You MUST reply in the language the customer used, which is detected as: ${analysisContext.language}.
    
    CONTEXT DATA:
    Here is the current active inventory (JSON):
    ${JSON.stringify(stockData)}
    
    Here is relevant knowledge base / FAQ info (JSON):
    ${JSON.stringify(kbData)}
    
    RULES:
    1. If the user asks about a product, check the inventory provided. If we have it, state the price and stock.
    2. If the user asks something covered in the FAQ, answer based on the FAQ.
    3. Keep responses concise and friendly (WhatsApp style). Do not write long paragraphs.
    4. If the user asks to buy, tell them you can help them place an order and ask for their details.
    5. Do NOT hallucinate products or policies. If it's not in the context, say you'll check with the owner.
    
    Customer's Message: "${customerMessage}"
    `;

    const result = await model.generateContent(systemPrompt);
    return result.response.text().trim();

  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
  }
};

module.exports = { generateResponse };
