const mongoose = require('mongoose');

const filedataSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: "users", },
    filename:{ type:String, required: true,},
    filetype:{ type:String, required: true,},
    filesize:{ type:String, required: true },
    filepath:{ type:String, required: true },
    download:{ type:Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Filedata =  mongoose.model('original_files', filedataSchema);
module.exports = Filedata;