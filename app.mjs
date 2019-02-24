import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { mongoURI } from "./config/keys";
import passport from "passport";
import passportConf from "./config/passport";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index";
import dataFetcherRouter from "./routes/dataFetcher";
import dataSetRouter from "./routes/dataSet";
import exchangeKeySetRouter from "./routes/exchangeKeySet";
import exchangesRouter from "./routes/exchanges";
import tradeBotRouter from "./routes/tradeBot";
import userRouter from "./routes/user";

const app = express();
dotenv.config();
passportConf(passport);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Logger
app.use(logger("dev"));

// Routes
app.use("/", indexRouter);
app.use("/data-fetcher", dataFetcherRouter);
app.use("/dataset", dataSetRouter);
app.use("/exchange-key-set", exchangeKeySetRouter);
app.use("/exchanges", exchangesRouter);
app.use("/trade-bot", tradeBotRouter);
app.use("/user", userRouter);

// HTTP Error 404 handler
app.use(function(req, res, next) {
  res.status(404).json({ status: 404, message: `Cannot ${req.method} ${req.path}` });
});

export default app;
