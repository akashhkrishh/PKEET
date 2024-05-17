const Admin = require('../models/Admin');
const User = require('../models/User');
const SendKeyModel = require('../models/SendKey');
const EncFileModel = require('../models/EncFile');
const ShareFileModel = require('../models/ShareFile');

const KeyGenration = require('../utils/KeyGeneration');
const SendMail = require('../utils/SendMail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const AdminUser = await Admin.findOne({ email });

        if (AdminUser) {
            return res.status(400).json({ message: 'email is already taken.' });
        }

        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new Admin({ name, email, password:hashpassword, role: "Admin" });
        const savedUser = await newUser.save();
        res.status(201).json({message:"Admin Registered Successful!"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const AdminUser = await Admin.findOne({ email });

        if (!AdminUser) {
            return res.status(400).json({ message: 'The email address not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, AdminUser.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid name or password.' });
        }

        const token = jwt.sign({ email: AdminUser.email, role: AdminUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.allowners = async (req, res) => {
    try {
        const ActiveRecipientList = await User.find({role:"owner"} )
        res.send(ActiveRecipientList)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.allfiletrans = async (req, res) => {
    try {
        const Allfiletrans = await ShareFileModel.find().populate('file_data').populate('owner').populate('receiver');
        res.send(Allfiletrans)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.allrecipients = async (req, res) => {
    try {
        const ActiveRecipientList = await User.find({role:"recipient"} )
        res.send(ActiveRecipientList)  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.allfiles = async (req, res) => {
    try {
        const AllFiles = await EncFileModel.find().populate('original').populate('owner')
        res.send(AllFiles)   
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.KeyReq = async (req, res) => {
    try {
        
        const data = await SendKeyModel.find({isSend:false}).populate('file_data').populate('users');
        res.send(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendKey = async (req, res) => {
    try {
        
        const { id } = req.body;
        const data = await SendKeyModel.findById(id);
        const userData = await User.findById(data.users);
        const userAttributes = [ userData.name, userData.email, Date.now() ] ;
   
        let fileKey,secretKey, originalname; 
        fileKey = await EncFileModel.findById(data.file_data);
        secretKey = fileKey.privateKey;
        originalname = fileKey.originalname;

        const hmac =  crypto.createHmac('sha256',Buffer.from(secretKey));
        hmac.update(userAttributes.toString());
        const sk = hmac.digest();
        const DecKey =  sk.toString("hex") ;
        if(!data.isSend){
            SendMail(userData.email,originalname, DecKey, fileKey.hashvalue);
            await SendKeyModel.findByIdAndUpdate(id,{isSend:true,secretkey:DecKey},{ new: true });
            res.send("Message Send Successfully!");
        }else {
            res.send("Message Already Send!");
        }      
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};