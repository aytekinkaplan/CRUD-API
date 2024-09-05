const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const productRoutes = require("./routes/product.route");

const app = express();
const port = process.env.PORT || 3000;
const host = "localhost";
const projectAPI = "CRUD-API";

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // Add this line

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to the CRUD API" });
});

app.use("/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { error: err });
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
