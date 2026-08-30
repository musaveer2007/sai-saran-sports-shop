/**
 * Helper to safely parse JSON
 */
const safeParseJson = (str, fallback = {}) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return fallback;
  }
};

/**
 * Standardize API responses
 */
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, error, message = 'An error occurred', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error,
  });
};

module.exports = { safeParseJson, sendSuccess, sendError };
