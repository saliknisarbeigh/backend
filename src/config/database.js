const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://saliknisar:saliknisar@cluster0.5tsex9x.mongodb.net/inspiro"
  );
};

module.exports = connectDb;
