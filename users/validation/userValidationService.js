const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");

const validator = process.env.VALIDATOR;

const validateRegistraion = (user) => {
  if (validator === "Joi") {
    const { error } = registerValidation(user);
    if (error) return error.details.map((detail) => detail.message);
  }
  return "";
};

const loginValidate = (user) => {
  if (validator === "Joi") {
    const { error } = loginValidation(user);
    if (error) return error.details.map((detail) => detail.message);
  }
  return "";
};

module.exports = { loginValidate, validateRegistraion };
