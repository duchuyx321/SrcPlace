// model
const Users = require('../Model/Users');
const TrustedDevices = require('../Model/TrustedDevices');
// util
const { hashPassword, comparePassword } = require('../../util/passwordUtil');
const { newDeviceID } = require('../../util/deviceUtil');
const {
    newAccessToken,
    newRefreshToken,
    newTempToken,
    setTokenInCookie,
} = require('../../util/jwtUtil');
// services
const AuthServices = require('../../services/AuthServices');
const TokenService = require('../../services/TokenService');
class AuthController {
    // [POST] --/auth/pre-login-check
    async PrevLoginCheck(req, res, next) {}
    // [POST] --/auth/login
    async login(req, res, next) {
        try {
            const pass = req.body.password;
            const usernameOrEmail = req.body.usernameOrEmail;
            // kiểm tra tài khoản người dùng
            const user = await Users.findOne({
                $or: [
                    {
                        username: usernameOrEmail,
                    },
                    { email: usernameOrEmail },
                ],
            });
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'wrong username or email!' });
            }
            const is_password = await comparePassword(pass, user.password);
            if (!is_password) {
                return res.status(401).json({ error: 'wrong password!' });
            }
            // check 2fa
            const userAgent = req.headers['user-agent'];
            const ip =
                (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
                req.socket.remoteAddress;
            const trustedDevice = await TrustedDevices.findOne({
                user_ID: user._id,
                ip: ip,
                userAgent: userAgent,
            });
            let device_ID = trustedDevice?.device_ID;
            if (!trustedDevice) {
                device_ID = await newDeviceID();
            }
            const result = await AuthServices.validateLoginSession({
                user_ID: user._id,
                device_ID: device_ID,
                ip: '',
                userAgent: '',
            });
            const profile = {
                user_ID: user._id,
                device_ID,
                role: user.role,
            };
            const { is_session, is_enabled2fa, is_trustDevices } = result;
            let meta = { is_session, is_enabled2fa, is_trustDevices };
            // kiểm tra và lấy token theo đúng yêu cầu
            if (!is_session && is_trustDevices) {
                const AccessToken = await newAccessToken(profile);
                const RefreshToken = await newRefreshToken(profile);
                await res.cookie(
                    'refreshToken',
                    RefreshToken,
                    setTokenInCookie(),
                );
                meta = { ...meta, AccessToken };
            } else {
                const TempToken = await newTempToken(profile);
                meta = { ...meta, TempToken };
            }
            const { password, ...other } = user._doc;
            return res.status(200).json({ data: other, meta: {} });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    // [POST] --/auth/register
    async register(req, res, next) {
        try {
            const { username, password, email } = req.body;
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    // [POST] --/auth/refresh
    async refresh(req, res, next) {
        try {
            // lưu ý cần kiểm tra token và thiết bị
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    // [POST] --/auth/logout
    async logout(req, res, next) {
        try {
            // lưu ý xóa token và session trên web
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();
