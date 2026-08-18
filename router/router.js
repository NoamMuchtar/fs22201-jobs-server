const express = require("express");
const jobRouter = require("../jobs/routes/jobRestControllers");
const userRouter = require("../users/router/userRestController");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.use("/jobs", jobRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  return handleError(res, 404, "Path not found");
});

module.exports = router;
