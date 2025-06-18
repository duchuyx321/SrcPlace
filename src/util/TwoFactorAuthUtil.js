const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Create
const createTowFactorAuth = async () => {
    try {
        const secret = speakeasy.generateSecret({
            length: 20,
            name: 'SrcPlace',
            issuer: 'SrcPlace',
        });
        const qrCodeImage = await QRCode.toDataURL(secret.otpauth_url);
        return {
            status: 200,
            qrCodeImage,
            secret: secret.base32,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            error: 'Không thể tạo mã xác thực 2FA.',
            message: error.message,
        };
    }
};
const is_TowFactorAuth = async ({ secret = '', token = '' } = {}) => {
    const isValid = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 1,
    });
    return isValid;
};
module.exports = { createTowFactorAuth };
