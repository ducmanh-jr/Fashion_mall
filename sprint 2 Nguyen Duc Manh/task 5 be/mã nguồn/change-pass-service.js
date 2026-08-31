const bcrypt = require('bcryptjs');

const mockUserDb = {
    id: 'u123',
    email: 'user_change_test@ecommerce.vn',
    passwordHash: bcrypt.hashSync('CurrentSecret123!', 10)
};

function changePassword(userId, oldPassword, newPassword) {
    if (userId !== mockUserDb.id) {
        return { success: false, message: 'User không tồn tại.' };
    }

    const isCorrect = bcrypt.compareSync(oldPassword, mockUserDb.passwordHash);
    if (!isCorrect) {
        return { success: false, message: 'Mật khẩu hiện tại không chính xác.' };
    }

    if (newPassword.length < 6) {
        return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    mockUserDb.passwordHash = bcrypt.hashSync(newPassword, 10);
    return { success: true, message: 'Đổi mật khẩu thành công!' };
}

function checkCurrentPassword(password) {
    return bcrypt.compareSync(password, mockUserDb.passwordHash);
}

module.exports = { changePassword, checkCurrentPassword };
