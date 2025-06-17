const jwt = require('jsonwebtoken');
require('dotenv').config();
class JwtMiddleware {
    async verifyTempToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader && !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({ error: 'user is not login!' });
            }
            const TempToken = authHeader.split(' ')[1];
            jwt.verify(TempToken, process.env.JWT_TEMP_TOKEN, (err, data) => {
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
}

module.exports = new JwtMiddleware();
