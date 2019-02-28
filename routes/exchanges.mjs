import express from "express";
import passport from "passport";
import { EXCHANGES } from "../config/constants";

import Binance from "../exchanges/Binance";

const router = express.Router();

// @route   GET /exchanges
// @desc    List exchanges
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(EXCHANGES);
});

// @route   GET /exchanges/:exchange
// @desc    Get information for an exchange
// @access  Private
router.get("/:exchange", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (typeof req.params.exchange === "string" && req.params.exchange.toLowerCase() === "binance") {
    console.log(Binance);
    res.json(Binance.getExchangeInfo());
  } else {
    res.status(404).json({ error: `Exchange ${req.params.exchange} not known` });
  }
});

export default router;
