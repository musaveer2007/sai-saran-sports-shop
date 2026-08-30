const { supabase } = require('../config/supabase');
const { model } = require('../config/gemini');

/**
 * Generates an embedding vector for a given text using Gemini
 */
const generateEmbedding = async (text) => {
  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return null;
  }
};

/**
 * Searches the knowledge base using vector similarity
 */
const searchKnowledgeBase = async (businessId, queryText, limit = 3) => {
  try {
    // Generate embedding for the user's query
    const embedding = await generateEmbedding(queryText);
    
    if (!embedding) return [];

    // Query Supabase pgvector using the match_knowledge_base RPC function
    // Note: We need to create an RPC function in Supabase for vector search
    // Since we didn't add it in the schema, we'll try a fallback text search as well
    const { data, error } = await supabase.rpc('match_knowledge_base', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
      p_business_id: businessId
    });

    if (error) {
      console.warn('Vector search failed (RPC might be missing), falling back to basic text search');
      // Fallback: simple text match if RPC doesn't exist
      const { data: fallbackData } = await supabase
        .from('knowledge_base')
        .select('*')
        .eq('business_id', businessId)
        .ilike('question', `%${queryText.split(' ')[0]}%`)
        .limit(limit);
        
      return fallbackData || [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
};

module.exports = { generateEmbedding, searchKnowledgeBase };
