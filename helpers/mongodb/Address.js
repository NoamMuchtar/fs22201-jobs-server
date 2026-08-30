const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const Adress = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  country: DEFAULT_VALIDATION,
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  zip: {
    type: Number,
    min: 0,
    default: 0,
  },
});

module.exports = Adress;
