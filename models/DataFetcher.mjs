import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

// Create Schema
const DataFetcherSchema = new Schema({
  exchange: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  // Keep records up to date
  keepUpToDate: { type: Boolean, required: true },
  // In minutes
  timeframe: { type: Number, required: true },
  assets: [String]
});

export default model("data-fetchers", DataFetcherSchema);
