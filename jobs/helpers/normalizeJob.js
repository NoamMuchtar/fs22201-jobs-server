const generateJobNumber = require("./generateJobNumber");

const normailizeJob = async (rawJob, userId) => {
  return {
    ...rawJob,
    image: {
      url:
        rawJob.image.url ||
        `https://placehold.co/600x400?text=${rawJob.company}`,
      alt: rawJob.image.alt || rawJob.title,
    },
    jobNumber: rawJob.jobNumber || (await generateJobNumber()),
    recruiter_id: rawJob.urecruiter_id || userId,
  };
};

module.exports = normailizeJob;
