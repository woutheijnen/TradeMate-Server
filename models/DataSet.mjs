import mongoose from "mongoose";

const model = mongoose.model;
const Schema = mongoose.Schema;

// Create Schema
const DataSetSchema = new Schema({
  // Link the datafetcher
  dataFetcher: { type: Schema.Types.ObjectId, ref: "data-fetchers", required: true },
  sets: {
    type: [
      {
        set: {
          type: {
            first: { type: String, required: true },
            second: { type: String, required: true },
            lastUpdate: { type: Date, required: true }
          },
          required: true
        },
        candles: {
          type: [
            {
              time: { type: Number, required: true },
              close: { type: Number, required: true },
              vol: { type: Number, required: true }
            }
          ],
          required: true,
          default: []
        }
      }
    ],
    required: true
  }
});

export default model("datasets", DataSetSchema);
