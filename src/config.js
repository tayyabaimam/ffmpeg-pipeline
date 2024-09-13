module.exports = {
    ffmpegPath: process.env.FFMPEG_PATH || '/usr/bin/ffmpeg',
    inputBucket: process.env.INPUT_BUCKET || 'input-videos',
    outputBucket: process.env.OUTPUT_BUCKET || 'processed-videos',
    region: process.env.AWS_REGION || 'us-east-1',
  };