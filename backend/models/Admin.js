const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name:{ type:String, required: true,},
    email:{ type:String, required: true, unique: true},
    password:{ type:String, required: true },
    role:{ type:String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Admin =  mongoose.model('admin', AdminSchema);
module.exports = Admin;