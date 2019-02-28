import BinanceApi from "binance-api-node";

if (!global.binance) {
  global.binance = new class Binance {
    constructor() {
      this.client = BinanceApi();
    }

    getExchangeInfo() {
      return { message: "ok" };
    }
  }();
}

export default global.binance;
