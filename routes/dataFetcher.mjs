import express from "express";
import passport from "passport";
import DataFetcher from "../models/DataFetcher";

import validateDataFetcherInput from "../validation/dataFetcher";

const router = express.Router();

// @route   GET /data-fetcher/list
// @desc    List data-fetchers
// @access  Private
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataFetcher.find()
    .sort({ date: -1 })
    .then(fetcher => res.json(fetcher))
    .catch(err => res.status(404).json({ error: "No data-fetchers found" }));
});

// @route   GET /data-fetcher/:id
// @desc    Shows details for a data-fetcher
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataFetcher.findById(req.params.id)
    .then(fetcher => res.json(fetcher))
    .catch(err => res.status(404).json({ error: `No data-fetcher found with id ${req.params.id}` }));
});

// @route   POST /data-fetcher/create
// @desc    Creates a new data-fetcher
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateDataFetcherInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors send 400 with errors object
    return res.status(400).json(errors);
  }
  const newDataFetcher = new DataFetcher({ ...req.body });
  newDataFetcher.save().then(fetcher => res.json({ success: true, fetcher }));
});

// @route   POST /data-fetcher/update
// @desc    Updates a data-fetcher
// @access  Private

// TODO : Make endpoint

// @route   DELETE /data-fetcher/:id
// @desc    Removes a data-fetcher
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataFetcher.findById(req.params.id)
    .then(fetcher => fetcher.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: `No data-fetcher found with id ${req.params.id}` }));
});

export default router;
