const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
} = require("../models/usersAccrssDataService");
const auth = require("../../auth/authService");
const { handleError, createError } = require("../../utils/handleErrors");
const returnUser = require("../helpers/returnUser");
const validateRegistraion = require("../validation/userValidationService");

const router = express.Router();

// create new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;

    const errorMessage = validateRegistraion(newUser);

    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }

    let user = await registerUser(newUser);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = req.user;
    let user = await getUser(id);

    if (!userInfo.isAdmin && userInfo._id != user._id) {
      return createError(
        "Authorization",
        "Only the own user can show is details",
        403,
      );
    }
    res.status(200).send(returnUser(user));
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// get all users
router.get("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;

    if (!userInfo.isAdmin) {
      return createError(
        "Authorization",
        "Only admin user can get all users list",
        403,
      );
    }
    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const errorMessage = validateRegistraion.loginValidate(req.body);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }
    const token = await loginUser(email, password);
    res.status(200).send(token);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});
module.exports = router;
