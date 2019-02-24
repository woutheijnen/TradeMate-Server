import express from "express";
import passport from "passport";
import DataSet from "../models/DataSet";

import validateDataSetInput from "../validation/dataSet";

const router = express.Router();

// @route   GET /dataset/list
// @desc    List datasets
// @access  Private
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataSet.find()
    .sort({ date: -1 })
    .then(dataset => res.json(dataset))
    .catch(err => res.status(404).json({ message: "No datasets found" }));
});

// @route   GET /dataset/:id
// @desc    Shows details for a dataset
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataSet.findById(req.params.id)
    .then(dataset => res.json(dataset))
    .catch(err => res.status(404).json({ message: `No dataset found with id ${req.params.id}` }));
});

// @route   POST /dataset/create
// @desc    Creates a new dataset
// @access  Private
router.post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateDataSetInput(req.body);
  // Check Validation
  if (!isValid) {
    // If any errors send 400 with errors object
    return res.status(400).json(errors);
  }
  const newDataSet = new DataSet({ ...req.body });
  newDataSet.save().then(dataset => res.json({ success: true, dataset }));
});

// @route   DELETE /dataset/:id
// @desc    Removes a dataset
// @access  Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataSet.findById(req.params.id)
    .then(dataset => dataset.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ message: `No dataset found with id ${req.params.id}` }));
});

export default router;
