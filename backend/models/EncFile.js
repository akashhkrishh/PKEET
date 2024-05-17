const mongoose = require('mongoose');

const encfiledataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    sender: {type: mongoose.Types.ObjectId, ref: "users", },
    original: {type: mongoose.Types.ObjectId, ref: "original_files",},

    name:{ type:String, required: true,},
    originalname:{ type:String, required: true,},
    filepath:{ type:String, required: true },
    
    publicKey:{ type:String, required: true },
    privateKey:{ type:String, required: true },
    
    hashvalue:{ type:String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const filedata =  mongoose.model('encrypted_files', encfiledataSchema);
module.exports = filedata;