const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");

// register new user
const registerUser = async (newUser) => {
  try {
    newUser.password = await generateUserPassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// get all user
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// login
const loginUser = async (email, password) => {
  try {
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
      return createError("Authntication", "User not exsist", 401);
    }
    const compaeration = await comparePassword(password, userFromDB.password);
    if (!compaeration) {
      return createError("Authntication", "Invalid email or password", 401);
    }

    const token = generateAuthToken(userFromDB);
    return token;
  } catch (error) {
    createError("Authntication", error.message);
  }
};

module.exports = { registerUser, getUser, getAllUsers, loginUser };
