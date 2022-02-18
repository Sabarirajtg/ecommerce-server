const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  total: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  ],
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;
