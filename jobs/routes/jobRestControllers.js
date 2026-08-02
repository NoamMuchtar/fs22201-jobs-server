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
const router = express.Router();

// get all jobs
router.get("/", async (req, res) => {
  try {
    let allJobs = await getAllJobs();
    res.send(allJobs).status(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// create new job
router.post("/", async (req, res) => {
  try {
    let job = await createJob(req.body);
    res.send(job).status(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get my jobs
router.get("/my-jobs", async (req, res) => {
  try {
    const { id } = req.body;
    let myJobs = await getMyJobs(id);
    res.status(200).send(myJobs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get card by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let job = await getJob(id);
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update job

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = req.body;
    let job = await updateJob(id, updatedJob);
    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete job
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let job = await deleteJob(id);
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// save job
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    let job = await saveJob(id, userId);
    res.status(200).send(job);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
