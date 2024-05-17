const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = require('../models/User');
const MSK = require('../models/MSK');
const FileModel = require('../models/File');
const EncFileModel = require('../models/EncFile');
const ShareFileModel = require('../models/ShareFile');
const SendKeyModel = require('../models/SendKey');

const setup = require('../utils/MasterKeyGeneration');
const KeyGenration  = require('../utils/KeyGeneration');
const Encryption  = require('../utils/Encryption');
const SendMail = require('../utils/SendMail');
 

exports.register = async(req, res) =>{

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email is already taken.' });
        }
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new User({
                name: name,
                email: email,
                role: 'owner',
                password: hashpassword ,
        });
        const savedUser = await newUser.save();
        const mskData = await MSK.findOne({email:email});
        if(!mskData){
            const attributeUniverse = [savedUser.email,savedUser._id];
            const setupResult = setup(attributeUniverse);
            const mskGeneration = new MSK({ email:email, msk: setupResult.msk });
            await mskGeneration.save();
        }
        res.status(201).json(savedUser);

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: error});
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const OwnerUser = await User.findOne({ email });
        if (!OwnerUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
        const passwordMatch = await bcrypt.compare(password, OwnerUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.'});
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
        const originalFile = new FileModel({
            download: 0,            
            owner: req.user,
            filename: req.file.originalname,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            filepath: initialPath,
        });

        const savedFile = await originalFile.save();
        const{ publicKeyPath , privateKeyPath  }= KeyGenration();
        Encryption(savedFile, req, initialPath, publicKeyPath, privateKeyPath);
        res.send({publicKeyPath,privateKeyPath});

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.myfiles = async (req, res) => {
    try {
        const myFiles = await EncFileModel.find({owner:req.user, sender:req.user}).populate('original').populate('owner');
        res.send(myFiles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.KeyReq = async (req, res) => {
    try {
        const existingdata = await SendKeyModel.find({isSend:false}).populate('file_data').populate('users');
        const arrData = [];
        for(let i=0;i<existingdata.length;i++){
            if(existingdata[i]['file_data']['owner'].toString() == req.user._id.toString()){
                arrData.push(existingdata[i]);
            }
        }
        
        res.send(arrData)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filetransactions = async (req, res) => {
    try {
        const myFiles = await ShareFileModel.find({owner:req.user}).populate('original').populate('receiver').populate('file_data');
        res.send(myFiles);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getRecipients = async (req, res) => {
    try {
        const getRecipientList = await User.find({role:'recipient'});
        res.send(getRecipientList);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.shareFiles = async (req, res) => {
    try {
        const { file_id, receiver } = req.body;
        const FileData = await EncFileModel.findById(file_id);
        const sender = req.user;

        const existData = await ShareFileModel.find({owner:req.user,file_data:file_id,sender:sender,receiver:receiver})
        if(existData.length !=0){
           
            return res.status(402).send({message:"Already File Shared"})
        }
        
        const shareFileData = new ShareFileModel({
            file_data: file_id,
            owner: req.user,
            sender: sender,
            receiver: receiver,
            original: FileData.original
        });

        const savedFile = await shareFileData.save();
        res.send(savedFile);
    
    } catch (err) {
        res.status(500).json({ message: 'File Sharing Failed.' });
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