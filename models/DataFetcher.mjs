import mongoose from "mongoose";

const model = mongoose.model;
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

export default model("data-fetchers", DataFetcherSchema);
