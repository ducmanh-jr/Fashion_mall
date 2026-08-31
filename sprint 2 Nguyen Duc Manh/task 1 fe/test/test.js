const { evaluatePasswordStrength } = require('../mã nguồn/password-meter');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 1: HTTMDTTHA-6 (Password Strength)");
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

// Test 1: Weak Password
const resWeak = evaluatePasswordStrength('123');
assert(resWeak.score <= 2 && resWeak.label.includes('Yếu'), "Mật khẩu '123' đánh giá đúng mức YẾU.");

// Test 2: Medium Password
const resMed = evaluatePasswordStrength('pass1234');
assert(resMed.score === 3 && resMed.label.includes('Trung Bình'), "Mật khẩu 'pass1234' đánh giá đúng mức TRUNG BÌNH.");

// Test 3: Strong Password
const resStrong = evaluatePasswordStrength('Pass1234');
assert(resStrong.score === 4 && resStrong.label.includes('Mạnh'), "Mật khẩu 'Pass1234' đánh giá đúng mức MẠNH.");

// Test 4: Very Strong Password
const resVeryStrong = evaluatePasswordStrength('StrongPass123!@#');
assert(resVeryStrong.score === 5 && resVeryStrong.label.includes('Rất Mạnh'), "Mật khẩu 'StrongPass123!@#' đánh giá đúng mức RẤT MẠNH.");

// Test 5: Detailed Rules Breakdown
const rulesBreakdown = resVeryStrong.rules;
assert(rulesBreakdown.hasMin && rulesBreakdown.hasUpper && rulesBreakdown.hasLower && rulesBreakdown.hasNumber && rulesBreakdown.hasSpecial, "Quy tắc phân tích chi tiết (Rules breakdown) trả về đầy đủ 5 tiêu chuẩn.");

// Test 6: Dynamic Brand Config Check
const { BRAND_CONFIG } = require('../mã nguồn/brand-config');
assert(BRAND_CONFIG && BRAND_CONFIG.name && BRAND_CONFIG.slogan, "Cấu hình thương hiệu động (Brand Config System) nạp thành công.");

console.log(`\n📊 Kết quả Task 1: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);

