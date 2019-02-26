import express from "express";
import passport from "passport";
import ExchangeKeySet from "../models/ExchangeKeySet";

import validateExchangeKeySetInput from "../validation/exchangeKeySet";

const router = express.Router();

// @route   GET /exchange-key-set/list
// @desc    List exchange-key-sets
// @access  Private
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
  ExchangeKeySet.find()
    .sort({ date: -1 })
    .then(keySet => res.json(keySet))
    .catch(err => res.status(404).json({ error: "No exchange-key-sets found" }));
});

// @route   GET /exchange-key-set/:id
// @desc    Shows details for an exchange-key-set
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  ExchangeKeySet.findById(req.params.id)
    .then(keySet => res.json(keySet))
    .catch(err => res.status(404).json({ error: `No exchange-key-set found with id ${req.params.id}` }));
});

// @route   POST /exchange-key-set/create
// @desc    Creates a new exchange-key-set
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateExchangeKeySetInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors send 400 with errors object
    return res.status(400).json(errors);
  }
  const newExchangeKeySet = new ExchangeKeySet({ ...req.body });
  newExchangeKeySet.save().then(keySet => res.json({ success: true, keySet }));
});

// @route   POST /exchange-key-set/update
// @desc    Updates an exchange-key-set
// @access  Private

// TODO : Make endpoint

// @route   DELETE /exchange-key-set/:id
// @desc    Removes an exchange-key-set
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  ExchangeKeySet.findById(req.params.id)
    .then(keySet => keySet.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: `No exchange-key-set found with id ${req.params.id}` }));
});

export default router;
