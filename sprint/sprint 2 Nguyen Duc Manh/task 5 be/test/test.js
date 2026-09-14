const { changePassword, checkCurrentPassword } = require('../mã nguồn/change-pass-service');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 5: HTTMDTTHA-47 (Change Password API)");
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

// Test 1: Change pass with wrong old password
const resWrongOld = changePassword('u123', 'WrongOldPass123', 'NewPass123!');
assert(!resWrongOld.success, "Từ chối đổi mật khẩu khi nhập sai mật khẩu cũ.");

// Test 2: Change pass with correct old password
const resCorrect = changePassword('u123', 'CurrentSecret123!', 'NewPass123!');
assert(resCorrect.success === true, "Đổi mật khẩu thành công khi nhập đúng mật khẩu cũ.");

// Test 3: Check new password
const isNewPassValid = checkCurrentPassword('NewPass123!');
assert(isNewPassValid === true, "Mật khẩu mới được mã hóa và xác thực chính xác.");

console.log(`\n📊 Kết quả Task 5: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);
