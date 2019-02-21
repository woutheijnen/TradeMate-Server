import express from "express";
import passport from "passport";

const router = express.Router();

// @route   POST /trade-bot/create
// @desc    Creates a new trade bot
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

export default router;
