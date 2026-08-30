const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
  PHONE,
  EMAIL,
  URL,
} = require("../../../helpers/mongodb/mongooseValidators");
const Image = require("../../../helpers/mongodb/Images");

const jobSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  company: DEFAULT_VALIDATION,
  description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
  category: DEFAULT_VALIDATION,
  jobType: DEFAULT_VALIDATION,
  experienceLevel: DEFAULT_VALIDATION,
  location: DEFAULT_VALIDATION,
  salary: {
    min: {
      type: Number,
      min: 0,
      default: 0,
    },
    max: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  phone: PHONE,
  email: { ...EMAIL, uniqe: false },
  applyLink: URL,
  image: Image,
  jobNumber: {
    type: Number,
    required: true,
    min: 1000000,
    max: 9999999,
  },
  savedBy: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recruiter_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
