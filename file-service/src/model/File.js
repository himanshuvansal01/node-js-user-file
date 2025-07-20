const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  uploaderId: { type: Number },
  s3Key: { type: String},
  isDeleted: {type: Boolean, default: false},
  isBlocked: {type: Boolean, default: false},
},{timestamps: true});

module.exports = mongoose.model('File', fileSchema);
