const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

const EncFileModel = require("../models/EncFile");
const HashValue  = require("../utils/HashValue");

const Encryption = async ( original, req, filepath, publicKeyPath, privateKeyPath) => {

    try {

        const newName = Date.now() + "enc" + path.basename(filepath);
        const destPath = "files/encrypted/" + newName;
        const plaintext = fs.readFileSync(filepath, 'utf8');
        const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

        const publicRsa = new NodeRSA(publicKey);

        const encryptedContent = publicRsa.encrypt(plaintext, 'base64');

        fs.writeFileSync(destPath, encryptedContent, 'base64');
        
        const hashvalue = await HashValue(destPath);
        
        const fileData = new EncFileModel({
            owner: req.user,
            sender: req.user,
            original: original,
            name: newName,
            originalname: path.basename(filepath),
            filepath: destPath,
            hashvalue: hashvalue,
            publicKey: publicKeyPath,
            privateKey: privateKeyPath,
        });
        
        await fileData.save();
        console.log('File encrypted successfully.');
    
    } catch (error) {
        console.error('An error occurred during encryption:', error);
    }

};

module.exports = Encryption;