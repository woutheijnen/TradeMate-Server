const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route   POST /trade-bot/create
// @desc    Creates a new trade bot
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

module.exports = router;
