import mongoose from "mongoose";

const StockInventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  stockQty: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

export default mongoose.models.StockInventory ||
  mongoose.model("StockInventory", StockInventorySchema);
