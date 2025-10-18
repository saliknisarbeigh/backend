const express = require("express");
const Sahabas = require("../models/Sahabas");

const router = express.Router();

// Get All Sahabas
router.get("/sahabas", async (req, res) => {
  try {
    const sahabas = await Sahabas.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Sahabas retrieved successfully",
      count: sahabas.length,
      sahabas,
    });
  } catch (error) {
    console.error("Get sahabas error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Single Sahaba by ID
router.get("/sahabas/:id", async (req, res) => {
  try {
    const sahaba = await Sahabas.findOne({ id: req.params.id });

    if (!sahaba) {
      return res.status(404).json({ error: "Sahaba not found" });
    }

    res.status(200).json({
      message: "Sahaba retrieved successfully",
      sahaba,
    });
  } catch (error) {
    console.error("Get sahaba error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add New Sahaba
router.post("/sahabas", async (req, res) => {
  try {
    const {
      id,
      personName,
      name,
      title,
      chapter,
      shortDescription,
      date,
      ayahAbove,
      ayahAboveSource,
      ayahBelow,
      ayahBelowSource,
      content,
      image,
    } = req.body;

    // Validation for required fields
    if (
      !id ||
      !personName ||
      !name ||
      !title ||
      !chapter ||
      !shortDescription ||
      !date ||
      !ayahAbove ||
      !ayahAboveSource ||
      !ayahBelow ||
      !ayahBelowSource ||
      !content ||
      !image
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // Check if sahaba with this ID already exists
    const existingSahaba = await Sahabas.findOne({ id });
    if (existingSahaba) {
      return res
        .status(400)
        .json({ error: "Sahaba with this ID already exists" });
    }

    // Create new sahaba
    const sahaba = new Sahabas({
      id,
      personName,
      name,
      title,
      chapter,
      shortDescription,
      date,
      ayahAbove,
      ayahAboveSource,
      ayahBelow,
      ayahBelowSource,
      content,
      image,
    });

    await sahaba.save();

    res.status(201).json({
      message: "Sahaba added successfully",
      sahaba,
    });
  } catch (error) {
    console.error("Add sahaba error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Sahaba by ID (supports partial updates)
router.put("/sahabas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove id from updates if present to prevent changing the document ID
    delete updates.id;

    // Find and update the document
    const sahaba = await Sahabas.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!sahaba) {
      return res.status(404).json({ error: "Sahaba not found" });
    }

    res.status(200).json({
      message: "Sahaba updated successfully",
      sahaba,
    });
  } catch (error) {
    console.error("Update sahaba error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Sahaba by ID
router.delete("/sahabas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sahaba = await Sahabas.findOneAndDelete({ id });

    if (!sahaba) {
      return res.status(404).json({ error: "Sahaba not found" });
    }

    res.status(200).json({
      message: "Sahaba deleted successfully",
      sahaba,
    });
  } catch (error) {
    console.error("Delete sahaba error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
