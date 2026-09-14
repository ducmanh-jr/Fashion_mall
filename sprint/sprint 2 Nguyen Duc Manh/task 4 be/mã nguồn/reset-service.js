const bcrypt = require('bcryptjs');

const mockUser = {
    email: 'user_reset_test@gmail.com',
    passwordHash: bcrypt.hashSync('OldPassword123!', 10)
};

const mockOtpStore = new Map();

function createMockOtp(email, otp, resetToken) {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.endsWith('@gmail.com')) {
        throw new Error('Chỉ hỗ trợ địa chỉ Email có đuôi @gmail.com.');
    }
    mockOtpStore.set(cleanEmail, {
        otp,
        expiresAt: Date.now() + 600000,
        resetToken,
        isVerified: false
    });
}

function verifyOTP(email, otp) {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.endsWith('@gmail.com')) {
        return { success: false, message: 'Chỉ hỗ trợ địa chỉ Email có đuôi @gmail.com.' };
    }
    const record = mockOtpStore.get(cleanEmail);
    if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
        return { success: false, message: 'OTP không hợp lệ hoặc đã hết hạn.' };
    }
    record.isVerified = true;
    return { success: true, resetToken: record.resetToken };
}

function resetPassword(email, resetToken, newPassword) {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.endsWith('@gmail.com')) {
        return { success: false, message: 'Chỉ hỗ trợ địa chỉ Email có đuôi @gmail.com.' };
    }
    const record = mockOtpStore.get(cleanEmail);
    if (!record || record.resetToken !== resetToken || !record.isVerified) {
        return { success: false, message: 'Reset token không hợp lệ hoặc chưa verify OTP.' };
    }
    if (newPassword.length < 6) {
        return { success: false, message: 'Mật khẩu mới quá yếu.' };
    }

    mockUser.passwordHash = bcrypt.hashSync(newPassword, 10);
    mockOtpStore.delete(cleanEmail);
    return { success: true, message: 'Đặt lại mật khẩu thành công!' };
}

function verifyLogin(email, password) {
    if (email.toLowerCase().trim() !== mockUser.email) return false;
    return bcrypt.compareSync(password, mockUser.passwordHash);
}

module.exports = { createMockOtp, verifyOTP, resetPassword, verifyLogin };
