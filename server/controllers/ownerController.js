const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const MSK = require('../models/MSK');
const setup = require('../utils/MasterKeyGeneration');
const { KeyGenration } = require('../utils/KeyGeneration');
const FileModel = require('../models/File');
const EncFileModel = require("../models/EncFile");
const { Encryption } = require('../utils/Encryption');
const { Decryption } = require('../utils/Decryption');

exports.register = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already taken.' });
        }
        
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new User(
            {
                name: name,
                email: email,
                role: 'owner',
                password: hashpassword ,
                
            }
        );

        
        const savedUser = await newUser.save();
        const mskData = await MSK.findOne({email:email});
        if(!mskData){
            const attributeUniverse = [savedUser.email,savedUser._id];
            const setupResult = setup(attributeUniverse);
            const mskGeneration = new MSK({ email:email, msk: setupResult.msk });
            await mskGeneration.save();
        }
        res.status(201).json(savedUser);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        
        const OwnerUser = await User.findOne({ email });
        if (!OwnerUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
  
        const passwordMatch = await bcrypt.compare(password, OwnerUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.', key:"IV" });
        }
  
        if (OwnerUser.status == 'pending') {
            return res.status(401).json({ message: 'Waiting For Authority Verification.', key:"P" });
        }
  
        if (OwnerUser.status == 'rejected') {
            return res.status(401).json({ message: 'Account  Was Rejected', key:"R" }); 
        }
  
        const token = jwt.sign({ email:OwnerUser.email, role: OwnerUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.fileUpload = async (req, res) =>{

    try {

        const initialPath = req.file.path;
        const msk = await MSK.findOne({email:req.user.email});
        const attributeSet = [req.user.email,Date.now()]
       
        const fileData = new FileModel({
            download: 0,            
            owner: req.user,
            filename: req.file.originalname,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            filepath: initialPath,
        
        });
        const savedFile = await fileData.save();
        const{ publicKey, privateKey }= KeyGenration(msk.msk,attributeSet.toString());
        Encryption(savedFile,req, initialPath, publicKey, privateKey);
        res.send({savedFile});

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.decrypt = async (req, res) =>{

    try {
        const { fileId } = req.body;

        const fileData = await EncFileModel.findById(fileId);


       const data = Decryption(fileData.filepath,fileData.iv,fileData.privateKey,fileData.encryptedSymmetricKey)
        res.send({data});

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 