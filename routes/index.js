var express = require('express');
var router = express.Router();

// @route   GET /test
// @desc    API test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'API is up and listening.' }));

module.exports = router;
