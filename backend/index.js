const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
require('dotenv').config();

const port = process.env.PORT || 1036
;

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const connectDB = require("./config/db.js"); 
connectDB();

app.use('/api/admin',require('./routes/adminRoutes'));
app.use('/api/owner',require('./routes/ownerRoutes'));
app.use("/api/recipient",require("./routes/recipientRoutes"));

app.get("/",(req,res)=>{
    res.send("Hello World!");
});

app.post("/api/filecontents", async(req,res)=>{
    try {
        
        const { file_path } = req.body;
    
        const plaintext = fs.readFileSync(file_path, 'utf8');
        res.send(plaintext.toString());
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
    }
  
});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})