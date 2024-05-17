const mongoose = require('mongoose');

const sendSchema = new mongoose.Schema({

    file_data: { type: mongoose.Types.ObjectId, ref: "encrypted_files", },
    users: { type: mongoose.Types.ObjectId, ref: "users", },
    isSend: {
        type: Boolean,
        default: false 
    },

    isReq: {
        type: Number,
        default: 1 
    },
    secretkey:{ type:String, default:null },

    createdAt: { type: Date, default: Date.now }
});

const sendKey =  mongoose.model('sendkeys', sendSchema);
module.exports = sendKey;