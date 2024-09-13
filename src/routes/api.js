const express = require('express');
const { addJob } = require('../services/jobQueue');

const router = express.Router();

router.post('/process-video', async (req, res) => {
  try {
    const { inputKey, outputKey, options } = req.body;
    const job = await addJob({ inputKey, outputKey, options });
    res.json({ message: 'Video processing job added to queue', jobId: job.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;