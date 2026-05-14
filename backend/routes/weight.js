const express = require('express');
const router = express.Router();
const { logWeight, getWeightLogs } = require('../controllers/weightController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, logWeight);
router.get('/',  protect, getWeightLogs);

module.exports = router;
