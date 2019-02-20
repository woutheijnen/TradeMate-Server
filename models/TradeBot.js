const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TradeBotSchema = new Schema({
  username: { type: String, required: true },
  exchange: { type: String, required: true },
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
  // In minutes
  timestamp: { type: Number, required: true },
  tradeableAssets: { type: [String], required: true }
});

module.exports = TradeBot = mongoose.model("trade-bots", TradeBotSchema);
