const express = require("express");
const router = express.Router();
const passport = require("passport");
// DataFetcher model
const DataFetcher = require("../models/DataFetcher");

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
  DataFetcher.findById(req.params.id)
    .then(fetcher => res.json(fetcher))
    .catch(err => res.status(404).json({ message: `No data-fetcher found with id ${req.params.id}` }));
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
