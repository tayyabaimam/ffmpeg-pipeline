const ffmpeg = require('fluent-ffmpeg');
const { uploadToS3, getSignedUrl } = require('./services/s3Service');
const config = require('./config');

ffmpeg.setFfmpegPath(config.ffmpegPath);

async function processVideo(inputKey, outputKey, options) {
  const inputUrl = await getSignedUrl(config.inputBucket, inputKey);
  
  return new Promise((resolve, reject) => {
    ffmpeg(inputUrl)
      .outputOptions(options)
      .toFormat('mp4')
      .on('end', async () => {
        try {
          const outputBuffer = await getOutputBuffer(); // Implement this function to get the processed video buffer
          await uploadToS3(config.outputBucket, outputKey, outputBuffer);
          resolve('Video processing completed and uploaded to S3');
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (err) => reject(err))
      .save('pipe:1'); // Output to buffer instead of file
  });
}

function generateThumbnail(inputPath, outputPath, time) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .screenshots({
        timestamps: [time],
        filename: 'thumbnail.png',
        folder: outputPath,
      })
      .on('end', () => resolve('Thumbnail generated'))
      .on('error', (err) => reject(err));
  });
}

module.exports = {
  processVideo,
  generateThumbnail,
};