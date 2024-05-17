const crypto = require('crypto');


function generateMasterSecretKey(attributeUniverse) {
  
    const concatenatedAttributes = attributeUniverse.join('');
    const hash = crypto.createHash('sha256');
    hash.update(concatenatedAttributes);
    const masterSecretKey = hash.digest('hex');
    return masterSecretKey;
}


function setup(attributeUniverse) {
    const masterSecretKey = generateMasterSecretKey(attributeUniverse);
    return {
      
        msk: masterSecretKey
    };
}

module.exports = setup;
