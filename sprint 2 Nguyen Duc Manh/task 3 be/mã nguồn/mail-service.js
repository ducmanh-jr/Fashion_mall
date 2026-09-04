const crypto = require('crypto');

const otpStore = new Map();

function requestForgotPasswordOTP(email) {
    if (!email) throw new Error('Email không được để trống.');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@gmail.com')) {
        throw new Error('Hệ thống chỉ chấp nhận địa chỉ Email có đuôi @gmail.com (VD: example@gmail.com).');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 phút
    const resetToken = crypto.randomBytes(32).toString('hex');

    const record = { otp, expiresAt, resetToken, isVerified: false };
    otpStore.set(cleanEmail, record);

    // Gửi mail simulation
    console.log(`✉️ [MAIL SERVICE] Đã gửi OTP ${otp} tới ${cleanEmail} (Hiệu lực 10 phút).`);

    return {
        success: true,
        email: cleanEmail,
        otp,
        expiresInSeconds: 600,
        resetToken
    };
}

module.exports = { requestForgotPasswordOTP, otpStore };
