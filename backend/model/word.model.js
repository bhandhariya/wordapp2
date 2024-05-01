const mongoose = require('mongoose');

// Define the schema for a word
const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  definition: { type: String, required: true }
});

// Create a model based on the schema
const Word = mongoose.model('Word', wordSchema);

module.exports = Word;