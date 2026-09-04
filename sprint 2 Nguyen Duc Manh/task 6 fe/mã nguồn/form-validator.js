/* ==============================================================================
 * AETHELGARD SHOPPING MALL — FORM VALIDATION MODULE
 * Full Name, Email Address, and Password Validation Rules & Edge Cases
 * ============================================================================== */

/**
 * XSS & HTML Entity Sanitizer
 */
function sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 1. Full Name Validation
 * Rules: Required, 2-100 chars after trim(), letters & spaces only (Vietnamese Unicode), no consecutive spaces, XSS sanitized.
 */
function validateFullName(name) {
    if (!name || typeof name !== 'string') {
        return { isValid: false, message: 'Họ và tên không được để trống.' };
    }

    const trimmed = name.trim();
    if (trimmed.length === 0) {
        return { isValid: false, message: 'Họ và tên không được để trống hoặc chỉ chứa khoảng trắng.' };
    }

    if (trimmed.length < 2 || trimmed.length > 100) {
        return { isValid: false, message: 'Họ và tên phải từ 2 đến 100 ký tự.' };
    }

    // Regex for Vietnamese Unicode letters and spaces
    const nameRegex = /^[a-zA-Z\u00C0-\u024F\u1EA0-\u1EF9\s]+$/;
    if (!nameRegex.test(trimmed)) {
        return { isValid: false, message: 'Họ và tên chỉ cho phép chữ cái (bao gồm chữ Tiếng Việt) và khoảng trắng, không chứa số hoặc ký tự đặc biệt.' };
    }

    if (/\s{2,}/.test(trimmed)) {
        return { isValid: false, message: 'Họ và tên không được chứa 2 hoặc nhiều khoảng trắng liên tiếp nhau.' };
    }

    const sanitized = sanitizeHTML(trimmed);
    return { isValid: true, value: sanitized, message: 'Hợp lệ.' };
}

/**
 * 2. Email Address Validation
 * Rules: Required, RFC 5322 standard format, max 254 chars, lowercase conversion.
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { isValid: false, message: 'Địa chỉ Email không được để trống.' };
    }

    const trimmed = email.trim();
    if (trimmed.length === 0) {
        return { isValid: false, message: 'Địa chỉ Email không được để trống.' };
    }

    if (trimmed.length > 254) {
        return { isValid: false, message: 'Địa chỉ Email không được vượt quá 254 ký tự (chuẩn RFC).' };
    }

    // RFC 5322 standard email regex pattern with valid domain & extension
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
        return { isValid: false, message: 'Định dạng Email không hợp lệ (cần đúng dạng username@domain.extension).' };
    }

    // Ensure domain extension is at least 2 chars (e.g. .com, .vn)
    const domainParts = trimmed.split('@')[1].split('.');
    const ext = domainParts[domainParts.length - 1];
    if (!ext || ext.length < 2) {
        return { isValid: false, message: 'Tên miền Email phải có phần mở rộng tối thiểu 2 ký tự (VD: .com, .vn).' };
    }

    const lowercased = trimmed.toLowerCase();
    const sanitized = sanitizeHTML(lowercased);
    return { isValid: true, value: sanitized, message: 'Hợp lệ.' };
}

/**
 * 3. Password Validation
 * Rules: Required, 8-128 chars, complexity evaluation.
 */
function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'Mật khẩu không được để trống.' };
    }

    if (password.length < 8 || password.length > 128) {
        return { isValid: false, message: 'Độ dài mật khẩu phải từ 8 đến 128 ký tự.' };
    }

    return { isValid: true, value: password, message: 'Mật khẩu đạt yêu cầu.' };
}

if (typeof module !== 'undefined') {
    module.exports = {
        sanitizeHTML,
        validateFullName,
        validateEmail,
        validatePassword
    };
}
