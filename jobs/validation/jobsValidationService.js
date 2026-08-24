const jobValidate = require("./Joi/jobsValidate");

const validator = process.env.VALIDATOR;

const jobValidation = (job) => {
  if (validator === "Joi") {
    const { error } = jobValidate(job);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

module.exports = jobValidation;
