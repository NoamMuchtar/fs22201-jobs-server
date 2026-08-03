const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
} = require("../models/usersAccrssDataService");
const auth = require("../../auth/authService");

const router = express.Router();

// create new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    let user = await registerUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const userInfo = req.user;
    let user = await getUser(id);

    if (!userInfo.isAdmin && userInfo._id != user._id) {
      return res.status(403).send("Only the own user can show is details");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get all users
router.get("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;

    if (!userInfo.isAdmin) {
      return res.status(403).send("Only admin user can get all users list");
    }
    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
