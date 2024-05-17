const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true, },
    role: {
        type: String,
        enum: ['owner', 'recipient'],
        required:"true"
    },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;