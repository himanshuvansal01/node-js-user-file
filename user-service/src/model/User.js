const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isDeleted: {type: Boolean, default: false},
    isBlocked: {type: Boolean, default: false},
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
