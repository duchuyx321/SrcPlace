const jwt = require('jsonwebtoken');
require('dotenv').config();

const newAccessToken = async (profile) => {
    const newAccessToken = await jwt.sign(
        profile,
        process.env.JWT_ACCESS_TOKEN,
        {
            algorithm: 'HS256',
            expiresIn: process.env.TIME_ACCESS_TOKEN || '1h',
        },
    );
    return newAccessToken;
};
const newRefreshToken = async (profile) => {
    const newRefreshToken = await jwt.sign(
        profile,
        process.env.JWT_REFRESH_TOKEN,
        {
            algorithm: 'HS256',
            expiresIn: process.env.TIME_REFRESH_TOKEN || '1h',
        },
    );
    return newRefreshToken;
};
const newTempToken = async (profile) => {
    const newTempToken = await jwt.sign(profile, process.env.JWT_TEMP_TOKEN, {
        algorithm: 'HS256',
        expiresIn: process.env.TIME_TEMP_TOKEN || '1h',
    });
    return newTempToken;
};

module.exports = { newAccessToken, newRefreshToken, newTempToken };
