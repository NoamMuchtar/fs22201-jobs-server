const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
  updateUser,
  changeRecruiterStatus,
  deleteUser,
} = require("../models/usersAccrssDataService");
const auth = require("../../auth/authService");
const { handleError, createError } = require("../../utils/handleErrors");
const returnUser = require("../helpers/returnUser");
const {
  validateRegistraion,
  loginValidate,
} = require("../validation/userValidationService");

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
    const errorMessage = loginValidate(req.body);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }
    const token = await loginUser(email, password);
    res.status(200).send(token);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// update user
router.put("/:id", auth, async (req, res) => {
  let userInfo = req.user;
  let updatedUser = req.body;
  const { id } = req.params;

  try {
    if (userInfo._id !== id) {
      return createError(
        "Authorization",
        "Only the own user can edit is details",
        403,
      );
    }

    const errorMessage = validateRegistraion(updatedUser);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }

    let user = await updateUser(id, updatedUser);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// change isRecruiter status
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;

  try {
    if (userInfo._id !== id) {
      return createError(
        "Authorization",
        "Only the own user can change is status",
        403,
      );
    }

    let user = await changeRecruiterStatus(id);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// delete user
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;

  try {
    if (!userInfo.isAdmin && userInfo._id !== id) {
      return createError(
        "Authorization",
        "Only the own user or admin can delete this user",
        403,
      );
    }

    let user = await deleteUser(id);
    res.status(200).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});
module.exports = router;
