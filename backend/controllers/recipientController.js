const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const FileModel = require('../models/File');
const EncFileModel = require('../models/EncFile');
const ShareFileModel = require('../models/ShareFile');
const SendKeyModel = require('../models/SendKey');
const UsedKeyModel = require('../models/UsedKeys');
const TestVerifiablity = require('../utils/TestVerifiability');
const Decryption = require('../utils/Decryption');

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
                role: 'recipient',
                password: hashpassword 
            }
        );
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const RecipientUser = await User.findOne({ email });
        if (!RecipientUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
        const passwordMatch = await bcrypt.compare(password, RecipientUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.'});
        }
        const token = jwt.sign({ email:RecipientUser.email, role: RecipientUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.sharedFiles = async (req, res) => {
    try {
        const FileData = await ShareFileModel.find({receiver:req.user}).populate('file_data').populate('sender',{password:false}).populate('original');
        const arrayData = []
        FileData.map((items,index)=>{
            if(items.owner.toString()==items.sender._id.toString()){
                arrayData.push(items);
            }
        });
        res.send(arrayData);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.mykeyreq = async (req, res) => {
    try {
        const FileData = await SendKeyModel.find({users:req.user}).populate('file_data');
        return res.send(FileData);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.decrypt = async (req, res) =>{
    
    try {
        const { fileId, secretkey } = req.body;
        const sharedKey = await SendKeyModel.find({secretkey:secretkey,isSend:true});
        const correctKey = await SendKeyModel.find({secretkey:secretkey,users:req.user});
        if(correctKey.length == 0){
            return res.status(400).json({ message: 'Invalid Secret Key!' });
        }
        if(sharedKey.length==0){
            return res.status(400).json({ message: 'Invalid Secret Key!' });
        }
        const usedkeys = await UsedKeyModel.find({key:secretkey})
        if(usedkeys.length!=0){
            return res.status(400).json({ message: 'Already Key Used' });
        }else{
            const newKey = new UsedKeyModel({
                key:secretkey,
                users:req.user
            });
            await newKey.save();
        }
        
        const fileData = await EncFileModel.findById(fileId);
        const {outputFilePath} = Decryption(fileData.filepath,fileData.privateKey);
        const files = await FileModel.findById(fileData.original)
        const resD = await TestVerifiablity(outputFilePath, files.filepath);
        if(!resD){
            return res.status(400).json({ message: 'Verifiavility Test Failed!' });
        }
        
        const data = fs.readFileSync(outputFilePath, 'utf8');
        const updateOri = await FileModel.findByIdAndUpdate(fileData.original,{download:(files.download+1)},{new:true})
        res.send({filename:updateOri.filename,TestResult:resD,data});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.getKey = async (req, res) => {
    try {
        const { file_id } = req.body;
        const exitsdata = await SendKeyModel.find({file_data:file_id,users:req.user});
        if(exitsdata.length != 0){
            return res.status(500).json({ message: 'Key Reqest Already Send.' });
        }
        const data = new SendKeyModel({
            file_data: file_id,
            users: req.user,
        });
        const savedFiles = await data.save();
        res.send(savedFiles);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.rereq= async (req, res) => {
    try {
        const { file_id } = req.body;
        const exitsdata = await SendKeyModel.findById(file_id);
        const savedFiles = await SendKeyModel.findByIdAndUpdate(file_id,{isSend:false,isReq:(exitsdata.isReq+1)});
        res.send(savedFiles);

    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};
 