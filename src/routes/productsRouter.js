const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Get All Products with optional search and filtering
router.get("/products", async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, inStock, sortBy } = req.query;
    let query = {};

    // Search functionality
    if (q) {
      query.$text = { $search: q };
    }

    // Filter by category
    if (category) {
      query.category = new RegExp(category, 'i');
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // In stock filter
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    } else if (inStock === 'false') {
      query.stock = 0;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sortBy === 'price_asc') sortOption = { price: 1 };
    if (sortBy === 'price_desc') sortOption = { price: -1 };
    if (sortBy === 'name_asc') sortOption = { name: 1 };
    if (sortBy === 'name_desc') sortOption = { name: -1 };
    if (sortBy === 'newest') sortOption = { createdAt: -1 };
    if (sortBy === 'oldest') sortOption = { createdAt: 1 };

    const products = await Product.find(query).sort(sortOption);

    res.status(200).json({
      message: products.length > 0 ? "Products retrieved successfully" : "No products found",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Single Product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add New Product
router.post("/products", async (req, res) => {
  try {
    const {
      title,
      description,
      name,
      image,
      stock,
      category,
      price,
      discount = 0,
    } = req.body;

    // Validation for required fields
    if (!title || !description || !name || !image || stock === undefined || !category || price === undefined) {
      return res.status(400).json({
        error: "All fields are required: title, description, name, image, stock, category, price",
      });
    }

    // Create new product
    const product = new Product({
      title,
      description,
      name,
      image,
      stock: parseInt(stock, 10),
      category,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Product by ID
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    const validFields = [
      'title', 'description', 'name', 'image', 
      'stock', 'category', 'price', 'discount'
    ];

    // Build updates object with only valid fields
    Object.keys(req.body).forEach(key => {
      if (validFields.includes(key)) {
        if (key === 'stock' || key === 'price' || key === 'discount') {
          updates[key] = parseFloat(req.body[key]);
        } else {
          updates[key] = req.body[key];
        }
      }
    });

    // Check if at least one valid field is provided
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "At least one valid field is required for update"
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
