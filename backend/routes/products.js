const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/helpers');

// Get all active products for a business
router.get('/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_active', true);
      
    if (error) throw error;
    return sendSuccess(res, data, 'Products fetched successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to fetch products');
  }
});

// Get single product details
router.get('/:businessId/:productId', async (req, res) => {
  try {
    const { productId, businessId } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('business_id', businessId)
      .single();
      
    if (error) throw error;
    return sendSuccess(res, data, 'Product fetched successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to fetch product');
  }
});

module.exports = router;
