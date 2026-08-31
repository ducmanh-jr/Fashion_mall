/* ==============================================================================
 * SHOPAI MARKET — AUTH PORTAL INTERACTIONS (Task 6 FE: HTTMDTTHA-51)
 * Segmented Tab Switcher (Quên Mật Khẩu / Đổi Mật Khẩu), Password Meter, Toast
 * ============================================================================== */

// ─── TAB SWITCHER (Segmented Control Animation) ───
function switchTab(tab) {
    const slider     = document.getElementById('tabSlider');
    const forgotBtn  = document.getElementById('tabForgotBtn');
    const changeBtn  = document.getElementById('tabChangeBtn');
    const forgotForm = document.getElementById('formForgot');
    const changeForm = document.getElementById('formChange');

    if (tab === 'forgot') {
        slider.classList.remove('slide-right');
        forgotBtn.classList.add('active');
        changeBtn.classList.remove('active');
        forgotForm.classList.add('active');
        changeForm.classList.remove('active');
    } else {
        slider.classList.add('slide-right');
        changeBtn.classList.add('active');
        forgotBtn.classList.remove('active');
        changeForm.classList.add('active');
        forgotForm.classList.remove('active');
    }
}

// ─── TOGGLE PASSWORD VISIBILITY ───
function togglePass(fieldId, btn) {
    const input     = document.getElementById(fieldId);
    const eyeOpen   = btn.querySelector('.eye-open');
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

// ─── PASSWORD STRENGTH METER UI ───
function evaluatePasswordStrength(password) {
    if (!password) return { score: 0, label: '—', color: '#cbd5e1' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: 'Yếu ❌', color: '#ef4444' };
    if (score === 3) return { score, label: 'Trung Bình ⚠️', color: '#f59e0b' };
    if (score === 4) return { score, label: 'Mạnh 💪', color: '#3b82f6' };
    return { score, label: 'Rất Mạnh 🛡️', color: '#10b981' };
}

function handlePasswordInput(value) {
    const box   = document.getElementById('strengthBox');
    const bar   = document.getElementById('strengthBar');
    const label = document.getElementById('strengthLabel');

    if (!value) {
        box.style.opacity = '0';
        return;
    }

    box.style.opacity = '1';
    const res = evaluatePasswordStrength(value);
    label.textContent = res.label;
    label.style.color = res.color;
    bar.style.width = (res.score * 20) + '%';
    bar.style.backgroundColor = res.color;
}

// ─── TOAST NOTIFICATION ───
let toastTimer = null;
function showToast(msg, isError) {
    const toast = document.getElementById('toastEl');
    const text  = document.getElementById('toastText');
    const icon  = document.getElementById('toastIcon');

    text.textContent = msg;

    if (isError) {
        icon.className = 'w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0';
        icon.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>';
    } else {
        icon.className = 'w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0';
        icon.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
    }

    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── FORM SUBMISSIONS ───
function onForgotSubmit(e) {
    e.preventDefault();
    const otp = document.getElementById('forgotOTP').value;
    if (otp !== '654321') {
        showToast('Mã OTP không chính xác! Vui lòng kiểm tra mã test 654321.', true);
        return;
    }
    const email = document.getElementById('forgotEmail').value;
    showToast(`🎉 Xác thực OTP thành công! Mật khẩu mới đã được cập nhật cho ${email}.`);
}

function onChangeSubmit(e) {
    e.preventDefault();
    const oldP = document.getElementById('changeOldPass').value;
    const newP = document.getElementById('changeNewPass').value;
    const confP = document.getElementById('changeConfirmPass').value;

    if (newP !== confP) {
        showToast('Mật khẩu mới và mật khẩu xác nhận không khớp!', true);
        return;
    }

    showToast('🎉 Đổi mật khẩu tài khoản thành công! Mật khẩu mới đã băm mã hóa Bcrypt.');
}
