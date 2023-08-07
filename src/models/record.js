// models/record.js
const mongoose = require('mongoose');

// Define the schema for your records
const recordSchema = new mongoose.Schema({
  name: { type: String, required: true  },
  index: { type: Number, required: true },
  address: { type: String, required: true },
});

// Create a mongoose model
module.exports = mongoose.model('record', recordSchema);