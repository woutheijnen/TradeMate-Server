const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route   GET /data-fetcher/list
// @desc    List data-fetchers
// @access  Private
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

// @route   GET /data-fetcher/:id
// @desc    Shows details for a data-fetcher
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

// @route   POST /data-fetcher/create
// @desc    Creates a new data-fetcher
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

// @route   DELETE /data-fetcher/:id
// @desc    Removes a data-fetcher
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  // TODO
  res.json({ message: "Not implemented yet" });
});

module.exports = router;
