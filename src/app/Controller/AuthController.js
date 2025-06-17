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
const MailerServices = require('../../services/MailerServices');
class AuthController {
    // [POST] --/auth/pre-login-check
    async PrevLoginCheck(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
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
            if (user.is_blocked) {
                return res.status(503).json({ error: 'user is blocked' });
            }
            const is_password = await comparePassword(pass, user.password);
            if (!is_password) {
                return res.status(401).json({ error: 'wrong password!' });
            }
            // check 2fa
            const userAgent = req.headers['user-agent'];
            const ip = req.ip;
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
                // thêm cookie vào db
                await TokenService.addToken({
                    ip,
                    device_ID,
                    userAgent,
                    user_ID: user._id,
                    token: RefreshToken,
                });
            } else {
                const TempToken = await newTempToken(profile);
                meta = { ...meta, TempToken };
                const user_IDs = [user._id];
                const to = [user.email];
                if (!is_trustDevices) {
                    // thêm thông báo và gửi đến người dùng
                    const resultSendMail =
                        await MailerServices.sendMailerAndNotify({
                            to,
                            user_IDs,
                            type: 'LOGIN_WARING',
                            io: req.io,
                            userAgent,
                            first_name: user.first_name,
                            last_name: user.last_name,
                        });
                    if (resultSendMail.status !== 200) {
                        return res
                            .status(resultSendMail.status)
                            .json({ error: resultSendMail.error });
                    }
                }
            }
            const { password, ...other } = user._doc;
            return res.status(200).json({ data: other, meta });
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
