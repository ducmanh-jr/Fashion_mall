const { requestForgotPasswordOTP, otpStore } = require('../mã nguồn/mail-service');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 3: HTTMDTTHA-10 (Mail Service OTP)");
console.log("===============================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, msg) {
    if (condition) {
        console.log(`  ✅ [PASS] ${msg}`);
        passed++;
    } else {
        console.error(`  ❌ [FAIL] ${msg}`);
        failed++;
    }
}

const testEmail = 'user_test_forgot@ecommerce.vn';
const res = requestForgotPasswordOTP(testEmail);

assert(res.success === true, "Gửi yêu cầu Quên mật khẩu thành công.");
assert(res.otp && res.otp.length === 6 && /^\d{6}$/.test(res.otp), "Mã OTP sinh ra đúng 6 chữ số.");
assert(res.expiresInSeconds === 600, "Thời gian hết hạn của OTP được thiết lập đúng 10 phút.");

const stored = otpStore.get(testEmail.toLowerCase());
assert(stored && stored.otp === res.otp && stored.resetToken === res.resetToken, "Mã OTP và Reset Token được lưu chính xác trong CSDL/Store.");

console.log(`\n📊 Kết quả Task 3: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);
