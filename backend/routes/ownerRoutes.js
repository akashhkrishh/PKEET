const router = require('express').Router();
const multer  = require('multer');
const path = require('path');


const tokenVerify = require("../middlewares/verifyToken");
const Controller = require("../controllers/ownerController");


router.get("/",tokenVerify.validOwner,(req,res)=>{
    res.send({name:req.user.name,email:req.user.email});
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/original/') 
    },
    filename: function (req, file, cb) {
      cb(null, path.basename(file.originalname)) 
    }
});

const upload = multer({ storage: storage });

router.post('/create',Controller.register);
router.post('/login',Controller.login);
router.post("/fileupload",tokenVerify.validOwner,upload.single('file'),Controller.fileUpload);
router.get('/myfiles',tokenVerify.validOwner,Controller.myfiles);
router.get('/getRecipients',tokenVerify.validOwner,Controller.getRecipients);
router.post('/sharefiles',tokenVerify.validOwner,Controller.shareFiles);
router.get('/filetransactions',tokenVerify.validOwner,Controller.filetransactions);
router.get('/keyReq',tokenVerify.validOwner,Controller.KeyReq);
router.put('/sendkey',tokenVerify.validOwner,Controller.sendKey);



module.exports = router;