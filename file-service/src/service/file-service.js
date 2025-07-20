const { UserModel } = require("../model");
const s3 = require("../middleware/s3-bucket"); // <-- use the new reusable s3 instance
const { v4: uuidv4 } = require("uuid"); // make sure to import this



exports.initiateFile = async (filename, size) => {
  try {
    const key = `uploads/${uuidv4()}-${filename}`;
    const partCount = Math.ceil(size / (5 * 1024 * 1024)); // 5MB

    const multipart = await s3
      .createMultipartUpload({
        Bucket: process.env.AWS_BUCKET,
        Key: key,
      })
      .promise();

    const parts = [];
    for (let i = 1; i <= partCount; i++) {
      const url = await s3.getSignedUrlPromise("uploadPart", {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        PartNumber: i,
        UploadId: multipart.UploadId,
        Expires: 3600,
      });
      parts.push({ partNumber: i, presignedUrl: url });
    }
    return { uploadId: multipart.UploadId, key, parts };
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.completeFile = async (uploadId, key, parts) => {
  try {
    await s3
      .completeMultipartUpload({
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts,
        },
      })
      .promise();

    const file = await File.create({
      filename: key.split("/").pop(),
      size: req.body.size,
      uploaderId: req.user.userId,
      s3Key: key,
    });
    return { fileId: file._id };
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.fetchFileById = async (fileId) => {
  try {
    const file = await File.findById(fileId);
    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: process.env.AWS_BUCKET,
      Key: file.s3Key,
      Expires: 3600,
    });
    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};
