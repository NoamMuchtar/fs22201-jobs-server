const _ = require("lodash");
const Job = require("../models/mongodb/Job");
const { createError } = require("../../utils/handleErrors");

const generateJobNumber = async () => {
  let jobsCount = Job.countDocuments();
  if (jobsCount === 8_999_999) {
    return createError(
      "Mongoose",
      "The app reached to the maximum jobs count",
      409,
    );
  }

  let random;
  do {
    random = _.random(1_000_000, 9_999_999);
  } while (await isJobNumberExsist(random));

  return random;
};

const isJobNumberExsist = async (jobNumber) => {
  try {
    const jobWidthThisJobNumber = await Job.findOne({ jobNumber });
    return Boolean(jobWidthThisJobNumber);
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};
module.exports = generateJobNumber;
