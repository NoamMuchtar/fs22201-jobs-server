const { createError } = require("../../utils/handleErrors");
const Job = require("./mongodb/Job");

const DB = "mongodb";

// Create Job
const createJob = async (newJob) => {
  if (DB === "mongodb") {
    try {
      let job = new Job(newJob);
      job = await job.save();
      return job;
    } catch (error) {
      return createError("Mongoose", error.message, 500);
    }
  }
};

// gat all jobs
const getAllJobs = async () => {
  if (DB === "mongodb") {
    try {
      let jobs = await Job.find();
      return jobs;
    } catch (error) {
      return createError("Mongoose", error.message, 500);
    }
  }
};

// get spesific job by id
const getJob = async (jobId) => {
  if (DB === "mongodb") {
    try {
      let job = await Job.findById(jobId);
      return job;
    } catch (error) {
      return createError("Mongoose", error.message, 500);
    }
  }
};

// get my jobs
const getMyJobs = async (recruiterId) => {
  try {
    let myJobs = await Job.find({ recruiter_id: recruiterId });
    return myJobs;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};

// update job
const updateJob = async (jobId, updatedJob) => {
  try {
    let job = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });
    return job;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};

// delete job
const deleteJob = async (jobId) => {
  try {
    let job = await Job.findByIdAndDelete(jobId);
    return job;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};

//save / unsave job
const saveJob = async (jobId, userId) => {
  try {
    let job = await Job.findById(jobId);

    if (!job) {
      return createError("A job with this id cannot be found");
    }

    if (job.savedBy.includes(userId)) {
      let newSavedByArray = job.savedBy.filter((id) => id != userId);
      job.savedBy = newSavedByArray;
    } else {
      job.savedBy.push(userId);
    }

    await job.save();
    return job;
  } catch (error) {
    return createError("Mongoose", error.message, 500);
  }
};
module.exports = {
  createJob,
  getAllJobs,
  getJob,
  getMyJobs,
  updateJob,
  deleteJob,
  saveJob,
};
