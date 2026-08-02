const express = require("express");
const jobRouter = require("../jobs/routes/jobRestControllers");
const userRouter = require("../users/router/userRestController");

const router = express.Router();

router.use("/jobs", jobRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send("Path not found");
});

module.exports = router;
