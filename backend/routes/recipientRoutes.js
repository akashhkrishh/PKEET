const router = require('express').Router();

const tokenVerify = require("../middlewares/verifyToken");
const Controller = require("../controllers/recipientController.js"); 

router.get("/",tokenVerify.validRecipient,(req,res)=>{
    res.send({name:req.user.name,email:req.user.email});
});

router.get("/getName",tokenVerify.validRecipient,(req,res)=>{
    res.send(req.user.name);
});

router.post('/create',Controller.register); 
router.post('/login',Controller.login);
router.get('/sharedfiles',tokenVerify.validRecipient,Controller.sharedFiles);
router.post('/decrypt',tokenVerify.validRecipient,Controller.decrypt);
router.post('/getKey',tokenVerify.validRecipient,Controller.getKey);
router.get('/mykeyreq',tokenVerify.validRecipient,Controller.mykeyreq);
router.put('/keyrereq',tokenVerify.validRecipient,Controller.rereq);

module.exports = router;