class AuthController {
    async login(req, res, next) {
        try {
            const pass = req.body.password;
            const usernameOrEmail = req.body.usernameOrEmail;
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    async register(req, res, next) {
        try {
            const { username, password, email } = req.body;
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    async refresh(req, res, next) {
        try {
            // lưu ý cần kiểm tra token và thiết bị
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
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
