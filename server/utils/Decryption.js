const fs = require('fs');
const crypto = require('crypto');

const Decryption = (filepath, iv,privateKey, encryptedSymmetricKey,) => {
    try {
        const ciphertext = fs.readFileSync(filepath, 'utf8');
        const decryptedSymmetricKey = crypto.privateDecrypt({
            key: privateKey.toString('base64'),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, encryptedSymmetricKey.toString('base64'));
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', decryptedSymmetricKey.toString('base64'), iv.toString('base64'));
        let decryptedData = decipher.update(ciphertext, 'base64', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return (decryptedData);
    } catch (error) {
        console.error('An error occurred during redecryption:', error);
        return null;
    }
};


module.exports = { Decryption };