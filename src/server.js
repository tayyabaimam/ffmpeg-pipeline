require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');
const { processJobs } = require('./services/jobQueue');
const { processVideo } = require('./videoProcessor');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Start processing jobs
processJobs(async (jobData) => {
  const { inputKey, outputKey, options } = jobData;
  await processVideo(inputKey, outputKey, options);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});