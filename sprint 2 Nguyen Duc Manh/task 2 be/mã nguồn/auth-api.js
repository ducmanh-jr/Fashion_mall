const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./route-guard');

function loginMockUser(role) {
    return jwt.sign({ id: 'usr_' + role, role: role }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { loginMockUser };
