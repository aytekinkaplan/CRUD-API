"use strict";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter product quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
