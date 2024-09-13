const Queue = require('bull');

const videoProcessingQueue = new Queue('video-processing', process.env.REDIS_URL);

function addJob(jobData) {
  return videoProcessingQueue.add(jobData);
}

function processJobs(processor) {
  videoProcessingQueue.process(async (job) => {
    try {
      await processor(job.data);
      return { status: 'completed' };
    } catch (error) {
      throw new Error(`Job failed: ${error.message}`);
    }
  });
}

module.exports = {
  addJob,
  processJobs,
};