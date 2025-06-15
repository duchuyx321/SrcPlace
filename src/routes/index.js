const public = require('./public');
const user = require('./User');
const admin = require('./Admin');
const auth = require('./auth');

const route = (app) => {
    // router user
    app.use('/user', user);
    // router admin
    app.use('/admin', admin);
    // router auth
    app.use('/auth', auth);
    // routes without login
    app.use('/', public);
};

module.exports = route;
