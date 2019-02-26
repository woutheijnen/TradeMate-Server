import express from "express";

const router = express.Router();

// @route   GET /test
// @desc    API test route
// @access  Public
router.get("/test", (req, res) => res.json({ message: "API is up and running." }));

export default router;
