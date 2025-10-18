const express = require("express");
const Inspire = require("../models/Inspire");

const router = express.Router();

// Get All Inspiring Quotes with optional search
router.get("/inspire", async (req, res) => {
  try {
    const { q } = req.query;
    let query = {};

    // Add search functionality
    if (q) {
      query = {
        $or: [
          { text: { $regex: q, $options: 'i' } },
          { author: { $regex: q, $options: 'i' } },
          { source: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const inspire = await Inspire.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: inspire.length > 0 ? "Inspiring quotes retrieved successfully" : "No quotes found",
      count: inspire.length,
      inspire,
    });
  } catch (error) {
    console.error("Get inspire error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Single Quote by ID
router.get("/inspire/:id", async (req, res) => {
  try {
    const quote = await Inspire.findOne({ id: req.params.id });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote retrieved successfully",
      quote,
    });
  } catch (error) {
    console.error("Get quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add New Inspiring Quote
router.post("/inspire", async (req, res) => {
  try {
    const { id, text, author, source } = req.body;

    // Validation for required fields
    if (!id || !text || !author || !source) {
      return res.status(400).json({
        error: "All fields are required: id, text, author, source",
      });
    }

    // Check if quote with this ID already exists
    const existingQuote = await Inspire.findOne({ id });
    if (existingQuote) {
      return res
        .status(400)
        .json({ error: "Quote with this ID already exists" });
    }

    // Create new quote
    const quote = new Inspire({
      id,
      text,
      author,
      source,
    });

    await quote.save();

    res.status(201).json({
      message: "Inspiring quote added successfully",
      quote,
    });
  } catch (error) {
    console.error("Add quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Quote by ID
router.put("/inspire/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author, source } = req.body;

    // Validation for required fields
    if (!text || !author || !source) {
      return res.status(400).json({
        error: "All fields are required: text, author, source",
      });
    }

    const quote = await Inspire.findOneAndUpdate(
      { id },
      { text, author, source },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote updated successfully",
      quote,
    });
  } catch (error) {
    console.error("Update quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Quote by ID
router.delete("/inspire/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Inspire.findOneAndDelete({ id });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote deleted successfully",
      quote,
    });
  } catch (error) {
    console.error("Delete quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Quote by ID
router.put("/inspire/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author, source } = req.body;

    // Check if at least one field is provided
    if (!text && !author && !source) {
      return res.status(400).json({
        error: "At least one field (text, author, or source) is required for update",
      });
    }

    const updates = {};
    if (text) updates.text = text;
    if (author) updates.author = author;
    if (source) updates.source = source;

    const quote = await Inspire.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote updated successfully",
      quote,
    });
  } catch (error) {
    console.error("Update quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Quote by ID
router.delete("/inspire/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Inspire.findOneAndDelete({ id });

    if (!quote) {
      return res.status(404).json({ error: "Quote not found" });
    }

    res.status(200).json({
      message: "Quote deleted successfully",
      quote,
    });
  } catch (error) {
    console.error("Delete quote error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
