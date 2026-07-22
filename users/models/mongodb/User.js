const mongoose = require("mongoose");
const Name = require("../../../helpers/mongodb/Name");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidators");
const Image = require("../../../helpers/mongodb/Images");
const { add } = require("../../../helpers/mongodb/Address");

const userSchema = new mongoose.Schema({
  name: Name,
  phone: PHONE,
  email: EMAIL,
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 7,
    MaxLength: 20,
  },
  image: Image,
  address: address,
  isRecruiter: {
    type: Boolean,
    default: false,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);
