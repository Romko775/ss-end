const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    isActive: {type: Boolean, required: true, default: true, select: false},
    isAdmin: {type: Boolean, required: true, default: false, select: false},
    isStuff: {type: Boolean, required: true, default: false, select: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    interests: {type: String, required: false},
    collections: {type: Object, select: false}
});

module.exports = mongoose.model('users', UsersSchema);
