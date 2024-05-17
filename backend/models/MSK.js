const mongoose = require('mongoose');

const mskSchema = new mongoose.Schema({
    msk:{ type:String, required: true,},
    email:{ type:String, required: true, unique: true,},
    createdAt: { type: Date, default: Date.now }
});

const MSK =  mongoose.model('msk', mskSchema);
module.exports = MSK;