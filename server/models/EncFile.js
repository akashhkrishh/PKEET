const mongoose = require('mongoose');

const encfiledataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    sender: {type: mongoose.Types.ObjectId, ref: "users", },
    name:{ type:String, required: true,},
    originalname:{ type:String, required: true,},
    filepath:{ type:String, required: true },
    original: {type: mongoose.Types.ObjectId, ref: "original_files",},
    hashvalue:{ type:String, required: true },
    encryptedSymmetricKey:{ type:String, required: true },
    publicKey:{ type:String, required: true },
    privateKey:{ type:String, required: true },
    iv:{ type:String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('encrypted_files', encfiledataSchema);
module.exports = Filedata;