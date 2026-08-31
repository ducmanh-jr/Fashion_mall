const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ecommerce_ai_super_secret_jwt_key_2026';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Yêu cầu Token xác thực (Unauthorized).' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn (Forbidden).' });
        }
        req.user = user;
        next();
    });
}

function requireRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Quyền truy cập bị từ chối! Yêu cầu vai trò: [${allowedRoles.join(', ')}]` 
            });
        }
        next();
    };
}

module.exports = { authenticateToken, requireRole, JWT_SECRET };
