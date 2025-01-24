const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  product: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
    },
  ],
  status: {
    type: String,
    default: "Pending",
    enum: ["Cancel", "Processing", "Success"],
  },
  paymentIntent: {},
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
