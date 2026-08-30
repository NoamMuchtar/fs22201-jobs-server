const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  getMyJobs,
  updateJob,
  deleteJob,
  saveJob,
} = require("../models/jobsAccessDataService");
const auth = require("../../auth/authService");
const normailizeJob = require("../helpers/normalizeJob");
const { handleError, createError } = require("../../utils/handleErrors");
const jobValidation = require("../validation/jobsValidationService");
const router = express.Router();

// get all jobs
router.get("/", async (req, res) => {
  try {
    let allJobs = await getAllJobs();
    res.send(allJobs).status(200);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// create new job
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isRecruiter) {
      createError(
        "Authorization",
        "Only Recruiter users can create new job",
        403,
      );
    }

    const validationErrorMessage = jobValidation(req.body);
    if (validationErrorMessage != "") {
      return createError("Validation", validationErrorMessage, 400);
    }

    let normalizedJob = await normailizeJob(req.body, userInfo._id);
    let job = await createJob(normalizedJob);

    res.send(job).status(201);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// get my jobs
router.get("/my-jobs", auth, async (req, res) => {
  try {
    // const { id } = req.body;
    const userInfo = req.user;

    if (!userInfo.isRecruiter) {
      createError("Authorization", "Only Recruiter users can get my jobs", 403);
    }

    let myJobs = await getMyJobs(userInfo._id);
    res.status(200).send(myJobs);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// get job by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let job = await getJob(id);
    res.status(200).send(job);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// update job

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    const originalJobFromDB = await getJob(id);

    if (!userInfo.isAdmin && userInfo._id != originalJobFromDB.recruiter_id) {
      return createError(
        "Authorization",
        "Only the job creator or admin can update",
        403,
      );
    }
    const validationErrorMessage = jobValidation(req.body);
    if (validationErrorMessage != "") {
      return createError("validation", validationErrorMessage, 400);
    }

    let normalizedJob = await normailizeJob(req.body, userInfo._id);
    let job = await updateJob(id, normalizedJob);

    res.status(201).send(job);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// delete job
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    const originalJobFromDB = await getJob(id);
    if (!userInfo.isAdmin && userInfo._id != originalJobFromDB.recruiter_id) {
      return createError(
        "Authorization",
        "Only the job creator or admin can delete",
        403,
      );
    }

    let job = await deleteJob(id);
    res.status(200).send(job);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// save job
router.patch("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;
    let job = await saveJob(id, userInfo._id);
    res.status(200).send(job);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});
module.exports = router;
