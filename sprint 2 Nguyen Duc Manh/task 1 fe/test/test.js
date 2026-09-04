const { evaluatePasswordStrength } = require('../mã nguồn/password-meter');
const { sanitizeHTML, validateFullName, validateEmail, validatePassword } = require('../mã nguồn/form-validator');
const { BRAND_CONFIG } = require('../mã nguồn/brand-config');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 1: HTTMDTTHA-6 (Form Validation Suite)");
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

// ─── 1. FULL NAME VALIDATION TESTS ───
assert(!validateFullName('').isValid, "Full Name: Từ chối khi để trống.");
assert(!validateFullName('   ').isValid, "Full Name: Từ chối khi chỉ chứa khoảng trắng.");
assert(!validateFullName('A').isValid, "Full Name: Từ chối độ dài < 2 ký tự.");
assert(validateFullName('Nguyễn Đức Mạnh').isValid, "Full Name: Hợp lệ với tiếng Việt có dấu Unicode.");
assert(!validateFullName('Manh123').isValid, "Full Name: Từ chối khi chứa ký tự số (0-9).");
assert(!validateFullName('Manh@#$').isValid, "Full Name: Từ chối khi chứa ký tự đặc biệt.");
assert(!validateFullName('Nguyễn   Mạnh').isValid, "Full Name: Từ chối khi chứa 2 hoặc nhiều khoảng trắng liên tiếp.");
assert(validateFullName('  Nguyễn Văn A  ').value === 'Nguyễn Văn A', "Full Name: Tự động trim() khoảng trắng đầu và cuối.");
assert(sanitizeHTML('<script>alert(1)</script>') === '&lt;script&gt;alert(1)&lt;/script&gt;', "Full Name: Mã hóa HTML entities chống XSS.");

// ─── 2. EMAIL ADDRESS VALIDATION TESTS ───
assert(!validateEmail('').isValid, "Email: Từ chối khi để trống.");
assert(!validateEmail('invalid-email').isValid, "Email: Từ chối khi thiếu ký tự '@' và domain.");
assert(!validateEmail('user@aethelgard.com').isValid, "Email: Từ chối tên miền không phải @gmail.com.");
assert(validateEmail('name@gmail.com').isValid, "Email: Hợp lệ đúng chuẩn với đuôi @gmail.com.");
assert(validateEmail('ADMIN@GMAIL.COM').value === 'admin@gmail.com', "Email: Tự động chuyển về dạng chữ thường (lowercase).");

// ─── 3. PASSWORD VALIDATION & STRENGTH TESTS ───
const resWeak = evaluatePasswordStrength('123');
assert(resWeak.score <= 2 && resWeak.label.includes('Yếu'), "Password: Mật khẩu '123' đánh giá đúng mức YẾU.");

const resMed = evaluatePasswordStrength('pass1234');
assert(resMed.score === 3 && resMed.label.includes('Trung Bình'), "Password: Mật khẩu 'pass1234' đánh giá đúng mức TRUNG BÌNH.");

const resStrong = evaluatePasswordStrength('Pass1234');
assert(resStrong.score === 4 && resStrong.label.includes('Mạnh'), "Password: Mật khẩu 'Pass1234' đánh giá đúng mức MẠNH.");

const resVeryStrong = evaluatePasswordStrength('StrongPass123!@#');
assert(resVeryStrong.score === 5 && resVeryStrong.label.includes('Rất Mạnh'), "Password: Mật khẩu 'StrongPass123!@#' đánh giá đúng mức RẤT MẠNH.");

const rulesBreakdown = resVeryStrong.rules;
assert(rulesBreakdown.hasMin && rulesBreakdown.hasUpper && rulesBreakdown.hasLower && rulesBreakdown.hasNumber && rulesBreakdown.hasSpecial, "Password: Phân tích đầy đủ 5 tiêu chí độ phức tạp.");

// ─── 4. BRAND CONFIG CHECK ───
assert(BRAND_CONFIG && BRAND_CONFIG.name === 'Aethelgard' && BRAND_CONFIG.slogan, "Brand System: Cấu hình thương hiệu Aethelgard Shopping Mall nạp thành công.");

console.log(`\n📊 Kết quả Task 1: ${passed}/${passed + failed} PASS\n`);
process.exit(failed === 0 ? 0 : 1);

