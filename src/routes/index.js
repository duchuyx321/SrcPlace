const public = require('./public');
const user = require('./User');
const admin = require('./Admin');
const auth = require('./auth');
const JwtMiddleware = require('../app/Middleware/JwtMiddleware');
const route = (app) => {
    // router user
    app.use('/user', JwtMiddleware.verifyAccessToken, user);
    // router admin
    app.use(
        '/admin',
        JwtMiddleware.verifyAccessToken,
        JwtMiddleware.verifyRoleUser('Admin'),
        admin,
    );
    // router auth
    app.use('/auth', auth);
    // routes without login
    app.use('/', public);
};

module.exports = route;
