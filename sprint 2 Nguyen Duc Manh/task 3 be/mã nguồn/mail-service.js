const crypto = require('crypto');

const otpStore = new Map();

function requestForgotPasswordOTP(email) {
    if (!email) throw new Error('Email không được để trống.');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 phút
    const resetToken = crypto.randomBytes(32).toString('hex');

    const record = { otp, expiresAt, resetToken, isVerified: false };
    otpStore.set(email.toLowerCase(), record);

    // Gửi mail simulation
    console.log(`✉️ [MAIL SERVICE] Đã gửi OTP ${otp} tới ${email} (Hiệu lực 10 phút).`);

    return {
        success: true,
        email: email.toLowerCase(),
        otp,
        expiresInSeconds: 600,
        resetToken
    };
}

module.exports = { requestForgotPasswordOTP, otpStore };
