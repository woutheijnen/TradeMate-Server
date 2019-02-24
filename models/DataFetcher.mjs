import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

// Create Schema
const DataFetcherSchema = new Schema({
  exchangeKeySet: { type: Schema.Types.ObjectId, ref: "exchange-key-sets", required: true },
  from: { type: Date, required: true },
  // To date not required, can be kept up to date
  to: { type: Date },
  // In minutes
  timeframe: { type: Number, required: true },
  assets: {
    type: [
      {
        first: { type: String, required: true },
        second: { type: String, required: true }
      }
    ],
    required: true
  },
  status: { type: String, default: "running" }
});

export default model("data-fetchers", DataFetcherSchema);
