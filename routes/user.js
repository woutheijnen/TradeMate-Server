const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Input validators
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

// Load User model
const User = require("../models/User");

// @route   GET /user/me
// @desc    Return current logged in user
// @access  Private
router.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

// @route   GET /user/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user & password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (user && isMatch) {
        // User Matched
        const payload = getPayload(req, user);

        // Create JWT Payload & Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.email = "Email or password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET /user/register
// @desc    Register an user, endpoint must be activated in .env file
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    if (errors.masterPassword) {
      return res.status(403).json(errors);
    } else {
      return res.status(400).json(errors);
    }
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });

      bcrypt.genSalt(16, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              return res.json(getPayload(req, user));
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

const getPayload = (req, user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    remoteAddress: req.connection.remoteAddress,
    xForwardedFor: req.headers["x-forwarded-for"]
  };
};

module.exports = router;
