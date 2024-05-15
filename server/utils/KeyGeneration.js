const crypto = require('crypto');

const KeyGenration = (msk, attributeSet) => {
    try {
        // Generate RSA key pair
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        return { publicKey, privateKey }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { KeyGenration }