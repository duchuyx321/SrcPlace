const TokenSession = require('../app/Model/TokenSession');
const TrustedDevices = require('../app/Model/TrustedDevices');
const TwoFactorAuth = require('../app/Model/TwoFactorAuth');

class AuthServices {
    // kiểm tra phiên đăng nhập và 2fa
    async validateLoginSession({
        user_ID = '',
        device_ID = '',
        ip = '',
        userAgent = '',
    } = {}) {
        const otherSession = await TokenSession.findOne({ user_ID });
        const authentication = await TwoFactorAuth.findOne({ user_ID });
        const trustedDevice = await TrustedDevices.findOne({
            user_ID,
            device_ID,
            ip,
            userAgent,
        });
        const isSameDevice = otherSession?.device_ID === device_ID;
        return {
            is_session: (!!otherSession && !isSameDevice) || false,
            is_enabled2fa: authentication.is_enabled || false,
            is_trustDevices: !!trustedDevice || false,
            is_verify2fa: authentication.is_verified || false,
        };
    }
}

module.exports = new AuthServices();
