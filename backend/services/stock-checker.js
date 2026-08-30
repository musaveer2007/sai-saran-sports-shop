const { supabase } = require('../config/supabase');

/**
 * Fetches relevant products for a given business based on a query text
 * @param {string} businessId 
 * @param {string} queryText 
 */
const checkStock = async (businessId, queryText) => {
  try {
    // In a full production app, we'd use pgvector here too or full-text search
    // For this implementation, we will fetch active products and do a basic filter
    // or just pass top 10 products to Gemini to figure out.
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, stock_quantity, category')
      .eq('business_id', businessId)
      .eq('is_active', true)
      .limit(20); // Get up to 20 products
      
    if (error) {
      console.error('Error fetching stock:', error);
      return [];
    }
    
    // Simple relevance filtering - if any word in the query matches the product name/category
    const queryWords = queryText.toLowerCase().split(/\s+/);
    
    const relevantProducts = data.filter(product => {
      const pName = product.name.toLowerCase();
      const pCat = product.category ? product.category.toLowerCase() : '';
      
      return queryWords.some(word => 
        word.length > 3 && (pName.includes(word) || pCat.includes(word))
      );
    });
    
    // If we found relevant ones, return them, else return all (let AI decide)
    return relevantProducts.length > 0 ? relevantProducts : data;
    
  } catch (error) {
    console.error('Error in checkStock:', error);
    return [];
  }
};

module.exports = { checkStock };
