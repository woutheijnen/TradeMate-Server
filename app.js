const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const botRouter = require('./routes/bot');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Logger
app.use(logger('dev'));

// Routes
app.use('/', indexRouter);
app.use('/bot', botRouter);

// HTTP Error 404 handler
app.use(function(req, res, next) {
	res.status(404).json({ status: 404, message: `Cannot ${req.method} ${req.path}` });
});

module.exports = app;
