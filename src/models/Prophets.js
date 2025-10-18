const mongoose = require("mongoose");

const prophetsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    personName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    chapter: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    ayahAbove: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    ayahAboveSource: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    ayahBelow: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    ayahBelowSource: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prophets", prophetsSchema);
