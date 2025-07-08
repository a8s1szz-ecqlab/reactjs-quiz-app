const express = require('express');
const router = express.Router();
const {
  validateIdentifier,
  getSystemInfo
} = require('../controllers/authController');

// Landing page routes
router.post('/validate', validateIdentifier);
router.get('/info', getSystemInfo);

module.exports = router;
