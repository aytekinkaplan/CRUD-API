const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model"); // Product modelini import et

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";
const projectAPI = "CRUD-API";

// Middleware
app.use(express.json()); // JSON body parser

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = new Product({ name, quantity, price });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "Failed to create product", details: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch products", details: error.message });
  }
});

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/crud-api")
  .then(() => console.log(`MongoDB connected and your ${projectAPI} is ready!`))
  .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
