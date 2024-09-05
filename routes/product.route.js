const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProduct,
  create,
  update,
  delete: deleteProduct,
} = require("../controllers/product.controller");

// List all products
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.render("products/list", { products });
  } catch (error) {
    res
      .status(500)
      .render("error", { error: "Failed to fetch products: " + error.message });
  }
});

// Show create product form
router.get("/create", (req, res) => {
  res.render("products/create", { product: {}, error: null });
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await create(req.body);
    res.redirect("/products");
  } catch (error) {
    res.status(400).render("products/create", {
      error: "Failed to create product: " + error.message,
      product: req.body,
    });
  }
});

// Show a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.render("products/show", { product });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).render("error", { error: "Product not found" });
    } else {
      res
        .status(500)
        .render("error", {
          error: "Failed to fetch product: " + error.message,
        });
    }
  }
});

// Show edit product form
router.get("/:id/edit", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.render("products/edit", { product, error: null });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).render("error", { error: "Product not found" });
    } else {
      res
        .status(500)
        .render("error", {
          error: "Failed to fetch product for editing: " + error.message,
        });
    }
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await update(req.params.id, req.body);
    res.redirect("/products");
  } catch (error) {
    res.status(400).render("products/edit", {
      error: "Failed to update product: " + error.message,
      product: { ...req.body, _id: req.params.id },
    });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.redirect("/products");
  } catch (error) {
    res
      .status(500)
      .render("error", { error: "Failed to delete product: " + error.message });
  }
});

module.exports = router;
