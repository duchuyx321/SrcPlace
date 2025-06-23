const CryptoJS = require('crypto-js');
require('dotenv').config();

const listType = {
    apiKey: process.env.KEY_PAYMENT_METHOD_API_KEY,
    partnerCode: process.env.KEY_PAYMENT_METHOD_PARTNER_CODE,
};
const encrypt = async (data, type) => {
    const enc = await CryptoJS.AES.encrypt(data, listType[type]).toString();
    return enc;
};
const decrypt = async (data, type) => {
    const dec = await CryptoJS.AES.decrypt(data, listType[type]);
    const result = await dec.toString(CryptoJS.enc.Utf8);
    return result;
};

module.exports = { encrypt, decrypt };
