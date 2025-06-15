const public = require('./public');

const route = (app) => {
    // routes without login
    app.use('/', public);
};

module.exports = route;
