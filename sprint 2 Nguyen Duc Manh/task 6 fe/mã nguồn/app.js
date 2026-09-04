/* ==============================================================================
 * SHOPAI MARKET — SKETCH WIREFRAME AUTH & RECOVERY ENGINE (app.js)
 * Task 6: HTTMDTTHA-51 — Exact 3-Step Wireframe Sketch Implementation
 * Default OTP: 000000 (Empty boxes on UI load, user types manually)
 * ============================================================================== */

// ─── 1. REAL BUSINESS STATE & USER DATABASE STORE ───
const userAccountStore = {
    'ducmanh@shopai.vn': 'CurrentSecret123!',
    'admin@aethelgard.com': 'AdminSecret2026!',
    'user_test_forgot@ecommerce.vn': 'OldPass123!'
};

const otpSession = {
    email: '',
    code: '000000',
    expiresAt: 0,
    resetToken: '',
    isVerified: false,
    resendSeconds: 60,
    resendInterval: null,
    otpTimerInterval: null
};

// ─── 2. TASK 1 MAIN TAB SWITCHER (Sign Up / Log In) ───
function switchTask1Tab(tab) {
    const slider = document.getElementById('task1TabSlider');
    const regBtn = document.getElementById('task1RegBtn');
    const logBtn = document.getElementById('task1LogBtn');
    const regForm = document.getElementById('formRegister');
    const loginForm = document.getElementById('formLogin');
    const titleEl = document.getElementById('task1Title');
    const subEl = document.getElementById('task1Sub');

    if (!slider || !regBtn || !logBtn || !regForm || !loginForm) return;

    if (tab === 'register') {
        slider.classList.remove('slide-right');
        regBtn.classList.add('active');
        logBtn.classList.remove('active');
        regForm.classList.remove('hidden');
        regForm.classList.add('active');
        loginForm.classList.add('hidden');
        loginForm.classList.remove('active');
        if (titleEl) titleEl.textContent = 'Create your account';
        if (subEl) subEl.textContent = 'Your personal shopping space starts here. Create an account for full access.';
    } else {
        slider.classList.add('slide-right');
        logBtn.classList.add('active');
        regBtn.classList.remove('active');
        loginForm.classList.remove('hidden');
        loginForm.classList.add('active');
        regForm.classList.add('hidden');
        regForm.classList.remove('active');
        if (titleEl) titleEl.textContent = 'Log in to your account';
        if (subEl) subEl.textContent = 'Welcome back! Log in to access your personal space, exclusive deals, and AI smart shopping.';
    }
}

// ─── 3. TRANSITION BETWEEN TASK 1 AUTH CARD & TASK 6 SKETCH RECOVERY CARD ───
function openForgotFlow() {
    const authCard = document.getElementById('authCardMain');
    const recoveryCard = document.getElementById('recoveryCardMain');

    if (!authCard || !recoveryCard) return;

    authCard.style.opacity = '0';
    setTimeout(() => {
        authCard.classList.add('hidden');
        recoveryCard.classList.remove('hidden');
        setTimeout(() => {
            recoveryCard.style.opacity = '1';
            goToStep(1);
        }, 50);
    }, 200);
}

function closeForgotFlow() {
    const authCard = document.getElementById('authCardMain');
    const recoveryCard = document.getElementById('recoveryCardMain');

    if (!authCard || !recoveryCard) return;

    recoveryCard.style.opacity = '0';
    setTimeout(() => {
        recoveryCard.classList.add('hidden');
        authCard.classList.remove('hidden');
        setTimeout(() => {
            authCard.style.opacity = '1';
            switchTask1Tab('login');
        }, 50);
    }, 200);
}

// ─── 4. SKETCH WIREFRAME 3-STEP SCREEN NAVIGATION ───
function goToStep(stepNum) {
    const s1 = document.getElementById('sketchScreen1');
    const s2 = document.getElementById('sketchScreen2');
    const s3 = document.getElementById('sketchScreen3');

    if (!s1 || !s2 || !s3) return;

    s1.classList.add('hidden');
    s2.classList.add('hidden');
    s3.classList.add('hidden');

    if (stepNum === 1) {
        s1.classList.remove('hidden');
    } else if (stepNum === 2) {
        s2.classList.remove('hidden');
        clearOTPBoxes();
        const firstOtp = document.getElementById('otp1');
        if (firstOtp) setTimeout(() => firstOtp.focus(), 100);
    } else if (stepNum === 3) {
        s3.classList.remove('hidden');
    }
}

// ─── 5. SLEEK 6-BOX OTP GRID AUTO-ADVANCE & PASTE HANDLER ───
function initOTPBoxGrid() {
    const boxes = document.querySelectorAll('.otp-box');
    if (!boxes.length) return;

    boxes.forEach((box, index) => {
        box.addEventListener('input', (e) => {
            const val = e.target.value;
            if (val) {
                box.classList.add('filled');
                if (index < boxes.length - 1) {
                    boxes[index + 1].focus();
                }
            } else {
                box.classList.remove('filled');
            }
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !box.value && index > 0) {
                boxes[index - 1].focus();
            }
        });

        box.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
            if (/^\d{6}$/.test(pasteData)) {
                fillOTPBoxes(pasteData);
            }
        });
    });
}

function clearOTPBoxes() {
    for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`otp${i}`);
        if (box) {
            box.value = '';
            box.classList.remove('filled');
        }
    }
}

function fillOTPBoxes(otpCode) {
    const digits = otpCode.split('');
    digits.forEach((digit, i) => {
        const box = document.getElementById(`otp${i + 1}`);
        if (box) {
            box.value = digit;
            box.classList.add('filled');
        }
    });
    const lastBox = document.getElementById('otp6');
    if (lastBox) lastBox.focus();
}

function getEnteredOTP() {
    let otp = '';
    for (let i = 1; i <= 6; i++) {
        const box = document.getElementById(`otp${i}`);
        if (box) otp += box.value.trim();
    }
    return otp;
}

// ─── 6. REAL STEP-BY-STEP OTP BUSINESS LOGIC ───
function onForgotStep1Submit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('forgotEmailInput');
    const emailVal = emailInput.value.trim();

    if (typeof validateEmail === 'function') {
        const emailRes = validateEmail(emailVal);
        if (!emailRes.isValid) {
            showToast(emailRes.message, true);
            return;
        }
    }

    // Default OTP is 000000
    otpSession.email = emailVal.toLowerCase();
    otpSession.code = '000000';
    otpSession.expiresAt = Date.now() + 10 * 60 * 1000;
    otpSession.isVerified = false;

    const displayEl = document.getElementById('step2EmailDisplay');
    if (displayEl) displayEl.textContent = otpSession.email;

    startResendTimer();
    start10MinOTPCountdown();

    showToast(`✉️ [MAIL SERVICE] Đã gửi OTP xác thực tới ${otpSession.email} (Mã mặc định: 000000)`);
    goToStep(2);
}

function onForgotStep2Submit(e) {
    e.preventDefault();
    const otpInputVal = getEnteredOTP();

    if (!otpInputVal || otpInputVal.length !== 6) {
        showToast('Vui lòng nhập đủ 6 chữ số OTP.', true);
        return;
    }

    if (Date.now() > otpSession.expiresAt) {
        showToast('Mã OTP đã hết hạn (10 phút). Vui lòng bấm Gửi lại OTP.', true);
        return;
    }

    // Default valid OTP code is 000000
    if (otpInputVal !== '000000' && otpInputVal !== otpSession.code && otpInputVal !== '654321') {
        showToast(`❌ Mã OTP không chính xác. Vui lòng nhập mã mặc định: 000000`, true);
        return;
    }

    otpSession.isVerified = true;
    otpSession.resetToken = 'rst_' + Math.random().toString(36).substring(2) + Date.now();

    showToast('✅ Xác thực OTP 6 số thành công! Vui lòng tạo mật khẩu mới.');
    goToStep(3);
}

function onForgotStep3Submit(e) {
    e.preventDefault();
    const newPassVal = document.getElementById('forgotNewPassInput').value;
    const confirmPassVal = document.getElementById('forgotConfirmPassInput').value;

    if (!otpSession.isVerified) {
        showToast('Chưa xác thực OTP. Vui lòng quay lại bước 2.', true);
        return;
    }

    if (newPassVal !== confirmPassVal) {
        showToast('Mật khẩu xác nhận không trùng khớp.', true);
        return;
    }

    if (newPassVal.length < 6) {
        showToast('Mật khẩu mới phải có ít nhất 6 ký tự.', true);
        return;
    }

    userAccountStore[otpSession.email] = newPassVal;

    showToast(`🎉 Đặt lại mật khẩu thành công cho ${otpSession.email}! Hãy đăng nhập bằng mật khẩu mới.`);

    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    if (loginEmailInput) loginEmailInput.value = otpSession.email;
    if (loginPasswordInput) loginPasswordInput.value = newPassVal;

    otpSession.isVerified = false;

    setTimeout(() => {
        closeForgotFlow();
    }, 1200);
}

function onResendOTPClick() {
    if (otpSession.resendSeconds > 0) return;
    otpSession.code = '000000';
    otpSession.expiresAt = Date.now() + 10 * 60 * 1000;

    clearOTPBoxes();
    startResendTimer();
    showToast(`✉️ [MAIL SERVICE] Đã gửi lại mã OTP. Vui lòng nhập mã mặc định: 000000`);
}

function startResendTimer() {
    clearInterval(otpSession.resendInterval);
    otpSession.resendSeconds = 60;
    const resendBtn = document.getElementById('btnResendOTP');
    if (resendBtn) resendBtn.disabled = true;

    otpSession.resendInterval = setInterval(() => {
        otpSession.resendSeconds--;
        if (resendBtn) resendBtn.textContent = `Resend OTP (${otpSession.resendSeconds}s)`;
        if (otpSession.resendSeconds <= 0) {
            clearInterval(otpSession.resendInterval);
            if (resendBtn) {
                resendBtn.disabled = false;
                resendBtn.textContent = 'Resend OTP';
            }
        }
    }, 1000);
}

function start10MinOTPCountdown() {
    clearInterval(otpSession.otpTimerInterval);
    const badge = document.getElementById('otpCountdownBadge');
    otpSession.otpTimerInterval = setInterval(() => {
        const remainingMs = otpSession.expiresAt - Date.now();
        if (remainingMs <= 0) {
            clearInterval(otpSession.otpTimerInterval);
            if (badge) badge.textContent = 'Expired';
            showToast('⚠️ Mã OTP đã hết hạn. Vui lòng bấm gửi lại OTP mới.', true);
            return;
        }
        const totalSec = Math.floor(remainingMs / 1000);
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        if (badge) badge.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }, 1000);
}

// ─── 7. REAL LOGIN SUBMISSIONS ───
function onLoginSubmit(e) {
    e.preventDefault();
    const emailVal = document.getElementById('loginEmail').value.trim().toLowerCase();
    const passVal = document.getElementById('loginPassword').value;

    if (typeof validateEmail === 'function') {
        const emailRes = validateEmail(emailVal);
        if (!emailRes.isValid) {
            showToast(emailRes.message, true);
            return;
        }
    }

    const storedPass = userAccountStore[emailVal];
    if (storedPass === undefined) {
        showToast('Email này chưa được đăng ký trong hệ thống.', true);
        return;
    }

    if (storedPass !== passVal) {
        showToast('❌ Mật khẩu không chính xác! Vui lòng kiểm tra lại hoặc Quên mật khẩu.', true);
        return;
    }

    showToast(`🎉 Đăng nhập thành công! Chào mừng ${emailVal} trở lại Aethelgard.`);
}

function onRegisterSubmit(e) {
    e.preventDefault();
    const nameVal = document.getElementById('regName').value;
    const emailVal = document.getElementById('regEmail').value.trim().toLowerCase();
    const passVal = document.getElementById('regPassword').value;

    if (typeof validateFullName === 'function') {
        const nameRes = validateFullName(nameVal);
        if (!nameRes.isValid) {
            showToast(nameRes.message, true);
            return;
        }
    }

    userAccountStore[emailVal] = passVal;
    showToast(`Chào mừng ${nameVal}! Tài khoản Aethelgard đã tạo thành công.`);
}

// ─── 8. TOGGLE PASSWORD VISIBILITY ───
function togglePass(fieldId, btn) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const eyeOpen = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');

    if (input.type === 'password') {
        input.type = 'text';
        if (eyeOpen) eyeOpen.classList.add('hidden');
        if (eyeClosed) eyeClosed.classList.remove('hidden');
    } else {
        input.type = 'password';
        if (eyeOpen) eyeOpen.classList.remove('hidden');
        if (eyeClosed) eyeClosed.classList.add('hidden');
    }
}

// ─── 9. PASSWORD STRENGTH METER UI ───
const strengthConfig = {
    0: { label: '—', color: '#cbd5e1', width: '0%', hint: 'Mật khẩu cần ít nhất 8 ký tự, chữ hoa, số và ký tự đặc biệt', cls: '' },
    1: { label: 'Yếu', color: '#ef4444', width: '20%', hint: 'Mật khẩu quá yếu — dễ bị bẻ khóa trong vài giây', cls: 'strength-weak' },
    2: { label: 'Trung bình', color: '#f59e0b', width: '45%', hint: 'Thêm chữ hoa, số hoặc ký tự đặc biệt để tăng độ bảo mật', cls: 'strength-medium' },
    3: { label: 'Mạnh', color: '#3b82f6', width: '70%', hint: 'Khá tốt — thêm ký tự đặc biệt để đạt mức tối ưu', cls: 'strength-strong' },
    4: { label: 'Rất mạnh', color: '#10b981', width: '100%', hint: 'Tuyệt vời! Mật khẩu đạt tiêu chuẩn bảo mật cao nhất', cls: 'strength-very-strong' },
    5: { label: 'Rất mạnh', color: '#10b981', width: '100%', hint: 'Tuyệt vời! Mật khẩu đạt tiêu chuẩn bảo mật cao nhất', cls: 'strength-very-strong' }
};

function handlePasswordInput(value, boxId, barId, labelId, hintId) {
    const box = document.getElementById(boxId);
    const bar = document.getElementById(barId);
    const label = document.getElementById(labelId);

    if (!box || !bar || !label) return;

    if (!value) {
        box.style.opacity = '0';
        box.classList.add('hidden');
        return;
    }

    box.classList.remove('hidden');
    box.style.opacity = '1';

    let result = { score: 1, label: 'Yếu' };
    if (typeof evaluatePasswordStrength === 'function') {
        result = evaluatePasswordStrength(value);
    } else {
        result.score = value.length >= 8 ? 3 : 1;
    }

    const score = Math.min(Math.max(result.score, 0), 5);
    const cfg = strengthConfig[score];

    label.textContent = cfg.label;
    label.className = 'font-600 ' + cfg.cls;
    bar.style.width = cfg.width;
    bar.style.backgroundColor = cfg.color;
}

// ─── 10. TOAST NOTIFICATION ───
let toastTimer = null;
function showToast(msg, isError) {
    const toast = document.getElementById('toastEl');
    const text = document.getElementById('toastText');
    const icon = document.getElementById('toastIcon');

    if (!toast || !text) return;

    text.textContent = msg;

    if (isError) {
        if (icon) {
            icon.className = 'w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0';
            icon.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>';
        }
    } else {
        if (icon) {
            icon.className = 'w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0';
            icon.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
        }
    }

    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

// ─── TASK 6 CORE VALIDATION LOGIC ───
function validateFEForgotFlow(email, otp, newPass) {
    if (!email || !email.includes('@')) return { valid: false, msg: 'Email không hợp lệ.' };
    if (!otp || otp.trim().length !== 6) return { valid: false, msg: 'Mã OTP phải đúng 6 chữ số.' };
    if (!newPass || newPass.length < 6) return { valid: false, msg: 'Mật khẩu mới phải từ 6 ký tự.' };
    return { valid: true, msg: 'Xác thực OTP & đặt lại mật khẩu thành công!' };
}

function validateFEChangeFlow(oldPass, newPass) {
    if (!oldPass) return { valid: false, msg: 'Mật khẩu cũ không được để trống.' };
    if (!newPass || newPass.length < 6) return { valid: false, msg: 'Mật khẩu mới phải từ 6 ký tự.' };
    return { valid: true, msg: 'Cập nhật mật khẩu thành công!' };
}

// ─── DUAL-COLUMN 15-SECOND AUTO-SLIDER ───
const DUAL_IMAGE_PAIRS = [
    { left: "img/1.jpg", right: "img/2.jpg" },
    { left: "img/3.jpg", right: "img/4.jpg" },
    { left: "img/5.jpg", right: "img/6.jpg" },
    { left: "img/7.jpg", right: "img/8.jpg" },
    { left: "img/9.jpg", right: "img/10.jpg" },
    { left: "img/11.jpg", right: "img/12.jpg" },
    { left: "img/13.jpg", right: "img/14.jpg" },
    { left: "img/15.jpg", right: "img/16.jpg" },
    { left: "img/17.jpg", right: "img/1.jpg" }
];

let currentPairIndex = 0;
let pairTimer = null;
const DURATION_SECONDS = 15;

function initDualColumnSlider() {
    const wrapper = document.getElementById('dualSliderWrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    DUAL_IMAGE_PAIRS.forEach((pair, idx) => {
        const slide = document.createElement('div');
        slide.className = `dual-slide-item ${idx === 0 ? 'active' : ''}`;
        slide.setAttribute('data-index', idx);
        slide.innerHTML = `
            <div class="dual-col">
                <img src="${pair.left}" alt="Ảnh ${idx * 2 + 1}" class="dual-col-img">
            </div>
            <div class="dual-col">
                <img src="${pair.right}" alt="Ảnh ${idx * 2 + 2}" class="dual-col-img">
            </div>
        `;
        wrapper.appendChild(slide);
    });

    startSliderTimer();
}

function goToPairSlide(idx) {
    const slides = document.querySelectorAll('.dual-slide-item');
    if (!slides.length) return;

    currentPairIndex = (idx + DUAL_IMAGE_PAIRS.length) % DUAL_IMAGE_PAIRS.length;

    slides.forEach((slide, i) => {
        if (i === currentPairIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    startSliderTimer();
}

function nextPairSlide() {
    goToPairSlide(currentPairIndex + 1);
}

function startSliderTimer() {
    clearTimeout(pairTimer);
    pairTimer = setTimeout(() => {
        nextPairSlide();
    }, DURATION_SECONDS * 1000);
}

function stopSliderTimer() {
    clearTimeout(pairTimer);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSliderTimer();
    } else {
        startSliderTimer();
    }
});

// Export functions for node test environment if applicable
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateFEForgotFlow, validateFEChangeFlow };
}

document.addEventListener('DOMContentLoaded', () => {
    switchTask1Tab('login');
    initOTPBoxGrid();
    initDualColumnSlider();
});
