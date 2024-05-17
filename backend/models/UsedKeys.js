const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    key:{ type:String, required: true,},
    users: { type: mongoose.Types.ObjectId, ref: "users", },
    createdAt: { type: Date, default: Date.now }
});

const Key =  mongoose.model('keys', keySchema);
module.exports = Key;