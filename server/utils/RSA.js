// const crypto = require('crypto');

const { Decryption } = require("./Decryption");

// // Generate RSA key pair
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//   modulusLength: 2048,
//   publicKeyEncoding: {
//     type: 'spki',
//     format: 'pem'
//   },
//   privateKeyEncoding: {
//     type: 'pkcs8',
//     format: 'pem'
//   }
// });

// // Data to be encrypted
// const dataToEncrypt = 'Sensitive data...'; // Your actual data here

// // Generate a random symmetric key for AES encryption
// const symmetricKey = crypto.randomBytes(32); // 256 bits

// // Encrypt the symmetric key using RSA public key
// const encryptedSymmetricKey = crypto.publicEncrypt({
//   key: publicKey,
//   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//   oaepHash: 'sha256'
// }, symmetricKey);

// // Encrypt the data using AES and the symmetric key
// const iv = crypto.randomBytes(16); // Initialization vector for AES
// const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
// let encryptedData = cipher.update(dataToEncrypt, 'utf-8', 'base64');
// encryptedData += cipher.final('base64');

// // To decrypt:
// // 1. Decrypt the symmetric key using RSA private key
// const decryptedSymmetricKey = crypto.privateDecrypt({
//   key: privateKey,
//   padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//   oaepHash: 'sha256'
// }, encryptedSymmetricKey);

// // 2. Decrypt the data using AES and the decrypted symmetric key
// const decipher = crypto.createDecipheriv('aes-256-cbc', decryptedSymmetricKey, iv);
// let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
// decryptedData += decipher.final('utf-8');
// console.log(encryptedSymmetricKey.toString('hex'))

// console.log('Decrypted data:', decryptedData);