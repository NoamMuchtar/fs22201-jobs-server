const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");
const returnUser = require("../helpers/returnUser");
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
    return createError("Authntication", error.message);
  }
};

// update user
const updateUser = async (userId, updatedUser) => {
  try {
    const userFromDB = await User.findById(userId);

    if (!userFromDB) {
      return createError("Authentication", "User not exist", 400);
    }

    let user = await User.findByIdAndUpdate(userId, updatedUser);
    user = await user.save();
    return returnUser(user);
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

// update isRecruiter status
const changeRecruiterStatus = async (userId) => {
  try {
    let user = await User.findById(userId);

    if (!user) {
      return createError("Authentication", "User not exsist", 400);
    }

    user.isRecruiter = !user.isRecruiter;
    user = await user.save();
    return returnUser(user);
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

// delete user
const deleteUser = async (userId) => {
  try {
    let user = await User.findById(userId);

    if (!user) {
      return createError("Authentication", "User not exsist", 400);
    }

    user = await User.findOneAndDelete(userId);
    return returnUser(user);
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
  updateUser,
  changeRecruiterStatus,
  deleteUser,
};
