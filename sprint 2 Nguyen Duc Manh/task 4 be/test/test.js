const { createMockOtp, verifyOTP, resetPassword, verifyLogin } = require('../mã nguồn/reset-service');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 4: HTTMDTTHA-46 (Verify OTP & Reset Pass)");
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

const testEmail = 'user_reset_test@ecommerce.vn';
const validOtp = '654321';
const validToken = 'reset_token_test_abc123';

createMockOtp(testEmail, validOtp, validToken);

// Test 1: Verify OTP Fail
const resVerifyFail = verifyOTP(testEmail, '000000');
assert(!resVerifyFail.success, "Từ chối mã OTP sai ('000000').");

// Test 2: Verify OTP Pass
const resVerifyPass = verifyOTP(testEmail, validOtp);
assert(resVerifyPass.success && resVerifyPass.resetToken === validToken, "Xác thực mã OTP đúng ('654321') và trả về Reset Token.");

// Test 3: Reset Password Pass
const newPass = 'NewStrongPass123!';
const resResetPass = resetPassword(testEmail, validToken, newPass);
assert(resResetPass.success, "Cập nhật mật khẩu mới thành công.");

// Test 4: Verify Login with new password
const isLoginValid = verifyLogin(testEmail, newPass);
assert(isLoginValid === true, "Đăng nhập thành công bằng mật khẩu vừa reset.");

console.log(`\n📊 Kết quả Task 4: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);
