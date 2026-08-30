require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { logger } = require('./utils/logger');

// Import routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const whatsappRoutes = require('./routes/whatsapp');
const instagramRoutes = require('./routes/instagram');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
// Meta webhooks sometimes send x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/webhooks/whatsapp', whatsappRoutes);
app.use('/api/webhooks/instagram', instagramRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  logger.info(`BizMitra backend server running on port ${PORT}`);
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
