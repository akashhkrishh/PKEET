const fs = require('fs');
const NodeRSA = require('node-rsa');

const Decryption = (inputFilePath,  privateKeyPath) => {
    try {
        const outputFilePath = 'files/decrypted/'+""+Date.now();
        const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
        const privateRsa = new NodeRSA(privateKey);
        const encryptedContent = fs.readFileSync(inputFilePath, 'base64');
        const decryptedContent = privateRsa.decrypt(encryptedContent, 'utf8');
        fs.writeFileSync(outputFilePath, decryptedContent);
        console.log('File decrypted successfully.');
        return ({outputFilePath});
    } catch (error) {
        console.error('An error occurred during redecryption:', error);
        return null;
    }
};


module.exports =  Decryption ;