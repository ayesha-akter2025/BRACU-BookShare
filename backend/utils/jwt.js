const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error('Invalid token:', err.message);
        return null;
    }
};

module.exports = { generateToken, verifyToken };
