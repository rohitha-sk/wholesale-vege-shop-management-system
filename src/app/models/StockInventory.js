import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const connection = mongoose.connection; // Ensure you're using a shared connection
const AutoIncrement = AutoIncrementFactory(connection);

const StockInventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  stockQty: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

// Add the auto-increment plugin for the "itemId" field
StockInventorySchema.plugin(AutoIncrement, { inc_field: "itemId" });

export default mongoose.models.StockInventory ||
  mongoose.model("StockInventory", StockInventorySchema);
