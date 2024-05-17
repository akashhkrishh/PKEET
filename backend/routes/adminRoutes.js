const router = require('express').Router();

const Controller = require("../controllers/adminController") 
const tokenVerify = require("../middlewares/verifyToken");

router.get("/",tokenVerify.validAdmin,(req,res)=>{
    console.log({name:req.user.name,email:req.user.email})
    res.send({name:req.user.name,email:req.user.email});
});

router.post('/create',Controller.register); 
router.post('/login',Controller.login);
router.get('/allowners',tokenVerify.validAdmin,Controller.allowners);
router.get('/allrecipients',tokenVerify.validAdmin,Controller.allrecipients);
router.get('/allfiles',tokenVerify.validAdmin,Controller.allfiles);
router.get('/keyReq',tokenVerify.validAdmin,Controller.KeyReq);
router.put('/sendkey',tokenVerify.validAdmin,Controller.sendKey);
router.get('/allfiletrans',tokenVerify.validAdmin,Controller.allfiletrans);

module.exports = router;