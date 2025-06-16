const ms = require('ms');
const TokenSession = require('../app/Model/TokenSession');
require('dotenv').config();

class TokenService {
    // add token
    async addToken({
        user_ID = '',
        token = '',
        device_ID = '',
        userAgent = '',
        ip = '',
    } = {}) {
        const expiresInMs = ms(process.env.TIME_REFRESH_TOKEN || '7d');
        const expiresAt = new Date(Date.now() + expiresInMs);
        const newToken = new TokenSession({
            user_ID,
            token,
            device_ID,
            userAgent,
            ip,
            expiresAt,
        });
        await newToken.save();
        return {
            status: 200,
            message: 'add token successful',
        };
    }
}

module.exports = new TokenService();
