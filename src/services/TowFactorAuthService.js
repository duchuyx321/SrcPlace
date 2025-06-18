const TwoFactorAuth = require('../app/Model/TwoFactorAuth');

class TwoFactorAuthService {
    async inItTowFactorAuth() {}
    async createTowFactorAuth() {
        try {
        } catch (error) {}
    }
    async checkTowFactorAuth({ user_ID = '', token = '' }) {
        const towFactorAuth = new TwoFactorAuth.fin();
    }
}
