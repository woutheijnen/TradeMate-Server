import express from "express";
import passport from "passport";
import DataSet from "../models/DataSet";

const router = express.Router();

// @route   GET /dataset/list
// @desc    List datasets
// @access  Private
router.get("/list", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataSet.find()
    .sort({ date: -1 })
    .then(dataset => res.json(dataset))
    .catch(err => res.status(404).json({ error: "No datasets found" }));
});

// @route   GET /dataset/:id
// @desc    Shows details for a dataset
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  DataSet.findById(req.params.id)
    .then(dataset => res.json(dataset))
    .catch(err => res.status(404).json({ error: `No dataset found with id ${req.params.id}` }));
});

export default router;
