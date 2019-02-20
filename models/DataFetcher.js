const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DataFetcherSchema = new Schema({
  exchanges: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  // Keep records up to date
  keepUpToDate: { type: Boolean, required: true },
  // In minutes
  timestamp: { type: Number, required: true },
  tradeableAssets: [String]
});

module.exports = DataFetcher = mongoose.model("data-fetchers", DataFetcherSchema);
