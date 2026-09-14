/**
 * ==============================================================================
 * SHOPAI MARKET — TASK 6: HTTMDTTHA-51 AUTOMATED UNIT TEST SUITE
 * Test suite for FE Password Recovery & Change Password validation logic
 * ==============================================================================
 */

const { validateFEForgotFlow, validateFEChangeFlow } = require('../mã nguồn/app');
const { validateEmail, validatePassword } = require('../mã nguồn/form-validator');

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

// ─── TEST SUITE 1: QUÊN MẬT KHẨU (FORGOT PASSWORD FLOW) ───
console.log("--- 1. Kiểm thử Luồng Quên Mật Khẩu (Forgot Flow) ---");

const resF1 = validateFEForgotFlow('ducmanh@gmail.com', '000000', 'NewPass123!');
assert(resF1.valid === true, "Chấp nhận dữ liệu hợp lệ (Email @gmail.com chuẩn, OTP 6 số mặc định: 000000, Mật khẩu mới >= 6 ký tự).");

const resF2 = validateFEForgotFlow('ducmanh@gmail.com', '123', 'NewPass123!');
assert(resF2.valid === false, "Từ chối OTP chưa đủ 6 chữ số (ví dụ: '123').");

const resF3 = validateFEForgotFlow('ducmanh@yahoo.com', '000000', 'NewPass123!');
assert(resF3.valid === false, "Từ chối Email không có đuôi @gmail.com (ví dụ: @yahoo.com).");

const resF4 = validateFEForgotFlow('ducmanh@gmail.com', '000000', '12345');
assert(resF4.valid === false, "Từ chối mật khẩu mới ngắn hơn 6 ký tự.");

// ─── TEST SUITE 2: ĐỔI MẬT KHẨU (CHANGE PASSWORD FLOW) ───
console.log("\n--- 2. Kiểm thử Luồng Đổi Mật Khẩu (Change Flow) ---");

const resC1 = validateFEChangeFlow('OldPass123!', 'NewPass123!');
assert(resC1.valid === true, "Chấp nhận mật khẩu cũ và mật khẩu mới hợp lệ.");

const resC2 = validateFEChangeFlow('', 'NewPass123!');
assert(resC2.valid === false, "Từ chối khi để trống mật khẩu cũ.");

const resC3 = validateFEChangeFlow('OldPass123!', '123');
assert(resC3.valid === false, "Từ chối mật khẩu mới ngắn hơn 6 ký tự.");

// ─── TEST SUITE 3: STRICTION EMAIL DOMAIN (@gmail.com ONLY) ───
console.log("\n--- 3. Kiểm thử Ràng Buộc Tên Miền Email (@gmail.com) ---");

const gmailValid = validateEmail('ducmanh@gmail.com');
assert(gmailValid.isValid === true, "Chấp nhận Email chuẩn có đuôi @gmail.com.");

const yahooInvalid = validateEmail('ducmanh@yahoo.com');
assert(yahooInvalid.isValid === false, "Từ chối Email có đuôi @yahoo.com.");

const outlookInvalid = validateEmail('ducmanh@outlook.com');
assert(outlookInvalid.isValid === false, "Từ chối Email có đuôi @outlook.com.");

const passTest = validatePassword('SecurePass2026!');
assert(passTest.isValid === true, "Validate độ dài và yêu cầu mật khẩu.");

// ─── BÁO CÁO KẾT QUẢ ───
console.log(`\n===============================================================`);
console.log(`📊 KẾT QUẢ KIỂM THỬ TASK 6: ${passed}/${passed + failed} TEST CASES PASS`);
console.log(`===============================================================\n`);

process.exit(failed === 0 ? 0 : 1);
