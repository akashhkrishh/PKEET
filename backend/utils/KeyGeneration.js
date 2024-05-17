
const fs = require('fs');
const NodeRSA = require('node-rsa');


const KeyGenration = () => {
    try {
      
        const key = new NodeRSA({ b: 2048 }); // 2048-bit key size
        const publicKey = key.exportKey('public');
        const privateKey = key.exportKey('private');
        const publicKeyPath = "files/keys/"+"Public"+Date.now();
        const privateKeyPath = "files/keys/"+"Private"+Date.now();
       

        fs.writeFileSync(publicKeyPath, publicKey);
        console.log('Public key generated and saved to', publicKeyPath);
    
        fs.writeFileSync(privateKeyPath, privateKey);
        console.log('Private key generated and saved to', privateKeyPath);

        return { publicKeyPath,privateKeyPath }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = KeyGenration ;


