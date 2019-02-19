var express = require('express');
var router = express.Router();

// @route   POST /bot/create
// @desc    Create a new bot
// @access  Private
router.post("/create", (req, res) => res.json({ msg: "OK." }));

module.exports = router;
