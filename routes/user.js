const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

// Load Input Validation
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../models/User');

// @route   GET /user
// @desc    Return current logged in user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check for user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User Matched

				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				}; // Create JWT Payload

				// Sign Token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 3600
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

module.exports = router;