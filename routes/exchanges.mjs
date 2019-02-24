import express from "express";
import passport from "passport";
import { EXCHANGES } from "../config/constants";

const router = express.Router();

// @route   GET /exchanges
// @desc    List exchanges
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(EXCHANGES);
});

export default router;
