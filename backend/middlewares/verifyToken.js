const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');
const User = require('../models/User');

const validAdmin = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
     jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        
        if(data.role != "Admin"){
            return res.send({role:"Admin"},403);
        }
        
        const user = await Admin.findOne({email:data.email})
        req.user = user;
        next();
    })
    
}
const validOwner = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        if(data.role != "owner"){
            return res.status(403).send({role:"recipient"});
        }
        
        const user = await User.findOne({email:data.email})
        req.user = user;
        next();
    })
    
}

const validRecipient = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }
        if(data.role != "recipient"){
            return res.status(403).send({role:"owner"});
        }
        
        const user = await User.findOne({email:data.email})
        req.user = user;
        next();
    })
    
}

module.exports  = {
    validOwner,
    validRecipient,
    validAdmin,
}