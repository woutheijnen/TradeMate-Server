import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { passportSecretKey } from "../config/keys";
import passport from "passport";
import User from "../models/User";

// Input validators
import validateLoginInput from "../validation/login";
import validateRegisterInput from "../validation/register";

const router = express.Router();

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
  const timestamp = Math.floor(+new Date());
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
    bcrypt.compare(password, user ? user.password : "").then(isMatch => {
      if (user && isMatch) {
        // User Matched, Create JWT Payload & Sign Token
        jwt.sign(
          getPayload(req, user),
          passportSecretKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            setTimeout(
              function() {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              },
              getResponseTimeout(timestamp),
              res
            );
          }
        );
      } else {
        errors.email = "Email or password incorrect";
        setTimeout(
          function() {
            res.status(400).json(errors);
          },
          getResponseTimeout(timestamp),
          res
        );
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

const getResponseTimeout = timestamp => {
  const addTimeout = 10000 + Math.floor(Math.random() * 3000 - 1500);
  const passed = Math.floor(+new Date()) - timestamp;
  return Math.max(addTimeout - passed, 1);
};

export default router;
