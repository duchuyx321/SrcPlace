const jwt = require('jsonwebtoken');
const TokenSession = require('../Model/TokenSession');
require('dotenv').config();
class JwtMiddleware {
    async verifyTempToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({ error: 'user is not login!' });
            }
            const tempToken = authHeader.split(' ')[1];
            jwt.verify(tempToken, process.env.JWT_TEMP_TOKEN, (err, data) => {
                if (err) {
                    return res.status(403).json({ error: err.message });
                }
                const user = {
                    user_ID: data.user_ID,
                    device_ID: data.device_ID,
                    role: data.role,
                };
                req.user = user;
                next();
            });
        } catch (error) {
            console.log(error);
            return res.status(503).json({ error: error.message });
        }
    }
    async verifyAccessToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({ error: 'user is not login!' });
            }
            const accessToken = authHeader.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN,
                (err, data) => {
                    if (err) {
                        return res.status(403).json({ error: err.message });
                    }
                    const user = {
                        user_ID: data.user_ID,
                        device_ID: data.device_ID,
                        role: data.role,
                    };
                    req.user = user;
                    next();
                },
            );
        } catch (error) {
            console.log(error);
            return res.status(503).json({ error: error.message });
        }
    }
    async verifyRefreshToken(req, res, next) {
        try {
            const cookie = req.cookies.refreshToken;
            if (!cookie || !cookie.startsWith('Bearer ')) {
                return res.status(403).json({ error: 'user is not login!' });
            }
            const refreshToken = cookie.split(' ')[1];
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN,
                async (err, data) => {
                    if (err) {
                        return res.status(403).json({ error: err.message });
                    }
                    const { user_ID, device_ID, role } = data;
                    const ip = req.ip;
                    const userAgent = req.headers['user-agent'];
                    const now = new Date();
                    const checkLoginSession = await TokenSession.findOne({
                        user_ID,
                        device_ID,
                        ip,
                        userAgent,
                        token: refreshToken,
                        is_revoked: false,
                    });
                    if (
                        !checkLoginSession ||
                        checkLoginSession.expiresAt < now
                    ) {
                        return res
                            .status(503)
                            .json({ error: 'Login session does not exist!' });
                    }
                    const user = {
                        user_ID,
                        device_ID,
                        role,
                    };
                    req.user = user;
                    next();
                },
            );
        } catch (error) {
            console.log(error);
            return res.status(503).json({ error: error.message });
        }
    }
}

module.exports = new JwtMiddleware();
