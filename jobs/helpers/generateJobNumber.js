const _ = require("lodash");
const Job = require("../models/mongodb/Job");

const generateJobNumber = async () => {
  let jobsCount = Job.countDocuments();
  if (jobsCount === 8_999_999) {
    throw new Error("The app reached to the maximum jobs count");
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
    throw new Error("Mongoose: " + error.message);
  }
};
module.exports = generateJobNumber;
