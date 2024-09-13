const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3({ region: config.region });

async function uploadToS3(bucket, key, body) {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
  };

  return s3.upload(params).promise();
}

async function getSignedUrl(bucket, key, expires = 3600) {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expires,
  };

  return s3.getSignedUrlPromise('getObject', params);
}

module.exports = {
  uploadToS3,
  getSignedUrl,
};