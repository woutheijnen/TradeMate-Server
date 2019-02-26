import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

// Create Schema
const ExchangeKeySetSchema = new Schema({
  exchange: { type: String, required: true },
  username: { type: String, required: true },
  apiKey: { type: String },
  apiSecret: { type: String }
});

export default model("exchange-key-sets", ExchangeKeySetSchema);
