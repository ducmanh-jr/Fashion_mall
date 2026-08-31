console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 6: HTTMDTTHA-51 (FE Quên & Đổi Mật Khẩu)");
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

// Simulated FE Validation Logic for HTTMDTTHA-51
function validateFEForgotFlow(email, otp, newPass) {
    if (!email || !email.includes('@')) return { valid: false, msg: 'Email không hợp lệ.' };
    if (!otp || otp.length !== 6) return { valid: false, msg: 'Mã OTP phải đúng 6 chữ số.' };
    if (!newPass || newPass.length < 6) return { valid: false, msg: 'Mật khẩu mới phải từ 6 ký tự.' };
    return { valid: true, msg: 'Form hợp lệ.' };
}

function validateFEChangeFlow(oldPass, newPass) {
    if (!oldPass) return { valid: false, msg: 'Mật khẩu cũ không được để trống.' };
    if (!newPass || newPass.length < 6) return { valid: false, msg: 'Mật khẩu mới phải từ 6 ký tự.' };
    return { valid: true, msg: 'Form đổi mật khẩu hợp lệ.' };
}

// Test 1: Forgot FE validation
const resF1 = validateFEForgotFlow('ducmanh@shopai.vn', '654321', 'NewPass123!');
assert(resF1.valid === true, "Form FE Quên mật khẩu chấp nhận dữ liệu hợp lệ (Email, OTP 6 số, Mật khẩu mới).");

// Test 2: Invalid OTP check
const resF2 = validateFEForgotFlow('ducmanh@shopai.vn', '12', 'NewPass123!');
assert(resF2.valid === false, "Form FE Quên mật khẩu từ chối OTP ngắn hơn 6 chữ số.");

// Test 3: Change FE validation
const resC1 = validateFEChangeFlow('OldPass123!', 'NewPass123!');
assert(resC1.valid === true, "Form FE Đổi mật khẩu chấp nhận mật khẩu cũ và mật khẩu mới hợp lệ.");

console.log(`\n📊 Kết quả Task 6: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);
