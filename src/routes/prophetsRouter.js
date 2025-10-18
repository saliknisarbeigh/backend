const express = require("express");
const Prophets = require("../models/Prophets");

const router = express.Router();

// Get All Prophets
router.get("/prophets", async (req, res) => {
  try {
    const prophets = await Prophets.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Prophets retrieved successfully",
      count: prophets.length,
      prophets,
    });
  } catch (error) {
    console.error("Get prophets error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Single Prophet by ID
router.get("/prophets/:id", async (req, res) => {
  try {
    const prophet = await Prophets.findOne({ id: req.params.id });

    if (!prophet) {
      return res.status(404).json({ error: "Prophet not found" });
    }

    res.status(200).json({
      message: "Prophet retrieved successfully",
      prophet,
    });
  } catch (error) {
    console.error("Get prophet error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add New Prophet
router.post("/prophets", async (req, res) => {
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

    // Check if prophet with this ID already exists
    const existingProphet = await Prophets.findOne({ id });
    if (existingProphet) {
      return res
        .status(400)
        .json({ error: "Prophet with this ID already exists" });
    }

    // Create new prophet
    const prophet = new Prophets({
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

    await prophet.save();

    res.status(201).json({
      message: "Prophet added successfully",
      prophet,
    });
  } catch (error) {
    console.error("Add prophet error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Prophet by ID (supports partial updates)
router.put("/prophets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove id from updates if present to prevent changing the document ID
    delete updates.id;

    // Find and update the document
    const prophet = await Prophets.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!prophet) {
      return res.status(404).json({ error: "Prophet not found" });
    }

    res.status(200).json({
      message: "Prophet updated successfully",
      prophet,
    });
  } catch (error) {
    console.error("Update prophet error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Prophet by ID
router.delete("/prophets/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const prophet = await Prophets.findOneAndDelete({ id });

    if (!prophet) {
      return res.status(404).json({ error: "Prophet not found" });
    }

    res.status(200).json({
      message: "Prophet deleted successfully",
      prophet,
    });
  } catch (error) {
    console.error("Delete prophet error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
