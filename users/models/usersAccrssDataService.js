const { generateAuthToken } = require("../../auth/providers/jwt");
const User = require("./mongodb/User");

// register new user
const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    throw new Error("Mongoos " + error.message);
  }
};

// get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Mongoos " + error.message);
  }
};

// get all user
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Mongoos " + error.message);
  }
};

// login
const loginUser = async (email, password) => {
  try {
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
      throw new Error("Authntication Error: User not exsist");
    }

    if (userFromDB.password !== password) {
      throw new Error("Authntication Error: Invalid email or password");
    }

    const token = generateAuthToken(userFromDB);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { registerUser, getUser, getAllUsers, loginUser };
