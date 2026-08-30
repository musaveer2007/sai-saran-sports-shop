const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const { sendSuccess, sendError } = require('../utils/helpers');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { 
      business_id, customer_name, customer_phone, customer_email, 
      customer_address, items, subtotal, shipping_fee, total 
    } = req.body;
    
    // In a real app, calculate total server-side to prevent tampering
    // and integrate with Razorpay to create an order instance here
    
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        business_id,
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        items,
        subtotal,
        shipping_fee,
        total,
        source: 'website'
      }])
      .select();
      
    if (error) throw error;
    
    // Deduct stock for each item
    for (const item of items) {
      // Simplistic stock deduction, real implementation needs to be atomic
      await supabase.rpc('decrement_stock', { p_id: item.product_id, qty: item.qty });
      // Note: rpc needs to be created, or do a read/write transaction
    }

    return sendSuccess(res, data[0], 'Order created successfully');
  } catch (error) {
    return sendError(res, error, 'Failed to create order');
  }
});

module.exports = router;
