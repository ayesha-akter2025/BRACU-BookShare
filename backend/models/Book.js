const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  borrower: { type: String, default: null }, // user ID if borrowed
});

module.exports = mongoose.model("Book", bookSchema);
