const Product = require("../models/product.model");

module.exports = {
  getAllProducts: async () => {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error("Failed to fetch products: " + error.message);
    }
  },

  getProduct: async (id) => {
    if (!id) throw new Error("Product ID is required");
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      if (error.name === "CastError") {
        throw new Error("Invalid product ID");
      }
      throw new Error("Failed to fetch product: " + error.message);
    }
  },

  create: async (productData) => {
    if (!productData) throw new Error("Product data is required");
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Invalid product data: " + error.message);
      }
      throw new Error("Failed to create product: " + error.message);
    }
  },

  update: async (id, updateData) => {
    if (!id) throw new Error("Product ID is required");
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error("Update data is required");
    }
    try {
      const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error("Invalid product data: " + error.message);
      } else if (error.name === "CastError") {
        throw new Error("Invalid product ID");
      }
      throw new Error("Failed to update product: " + error.message);
    }
  },

  delete: async (id) => {
    if (!id) throw new Error("Product ID is required");
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      if (error.name === "CastError") {
        throw new Error("Invalid product ID");
      }
      throw new Error("Failed to delete product: " + error.message);
    }
  },
};
