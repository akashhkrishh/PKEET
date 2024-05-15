const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const EncFileModel = require("../models/EncFile");
const { HashValue } = require("../utils/HashValue");

const Encryption = async (original, req, filepath, publicKey, privateKey) => {

    try {

        const newName = Date.now() + "enc" + path.basename(filepath);
        const destPath = "files/encrypted/" + newName;
        const plaintext = fs.readFileSync(filepath, 'utf8');
        // Generate RSA key pair
        // Generate a random symmetric key for AES encryption
        const symmetricKey = crypto.randomBytes(32); // 256 bits

        // Encrypt the symmetric key using RSA public key
        const encryptedSymmetricKey = crypto.publicEncrypt({
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, symmetricKey);

        // Encrypt the data using AES and the symmetric key
        const iv = crypto.randomBytes(16); // Initialization vector for AES
        const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
        let encryptedData = cipher.update(plaintext, 'utf-8', 'base64');
        encryptedData += cipher.final('base64');
        fs.writeFileSync(destPath, encryptedData);

        const hashvalue = await HashValue(destPath);

        console.log(publicKey,privateKey,encryptedSymmetricKey,iv)

        const fileData = new EncFileModel({
            owner: req.user,
            sender: req.user,
            original: original,
            name: newName,
            originalname: path.basename(filepath),
            filepath: destPath,
            hashvalue: hashvalue,
            publicKey: publicKey.toString('hex'),
            privateKey: privateKey.toString('hex'),
            encryptedSymmetricKey:encryptedSymmetricKey.toString('hex'),
            iv:iv.toString('hex')
        });
        
        console.log(fileData)
        await fileData.save();
        console.log('Encryption completed');


    } catch (error) {
        console.error('An error occurred during encryption:', error);
    }

};

module.exports = { Encryption };