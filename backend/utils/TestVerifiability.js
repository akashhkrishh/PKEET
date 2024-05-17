const HashValue = require("./HashValue");

const TestVerifiablity = async(outputFilePath,fileDatapath) => {
    try {
        const OHashValue = await HashValue(outputFilePath)
        const FHashValue = await HashValue(fileDatapath)
        return OHashValue == FHashValue;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = TestVerifiablity;


