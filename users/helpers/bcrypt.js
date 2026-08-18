const bcrypt = require("bcrypt");
const generateUserPassword = (password) => bcrypt.hash(password, 10);
const comparePassword = (password, cryptPassword) => {
  return bcrypt.compare(password, cryptPassword);
};

module.exports = { generateUserPassword, comparePassword };
