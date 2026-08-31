/* ==============================================================================
 * SHOPAI MARKET — AUTH PORTAL INTERACTIONS (app.js)
 * Task 1: HTTMDTTHA-6 — Tab Switcher, Password Meter UI, Toast, Toggle Eye
 * ============================================================================== */

// ─── TAB SWITCHER (Segmented Control Animation) ───
function switchTab(tab) {
    const slider    = document.getElementById('tabSlider');
    const regBtn    = document.getElementById('tabRegBtn');
    const logBtn    = document.getElementById('tabLogBtn');
    const regForm   = document.getElementById('formRegister');
    const loginForm = document.getElementById('formLogin');

    if (tab === 'register') {
        slider.classList.remove('slide-right');
        regBtn.classList.add('active');
        logBtn.classList.remove('active');
        regForm.classList.add('active');
        loginForm.classList.remove('active');
    } else {
        slider.classList.add('slide-right');
        logBtn.classList.add('active');
        regBtn.classList.remove('active');
        loginForm.classList.add('active');
        regForm.classList.remove('active');
    }
}

// ─── TOGGLE PASSWORD VISIBILITY ───
function togglePass(fieldId, btn) {
    const input     = document.getElementById(fieldId);
    const eyeOpen   = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');

    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
    } else {
        input.type = 'password';
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
    }
}

// ─── PASSWORD STRENGTH METER UI (HTTMDTTHA-6) ───
const strengthConfig = {
    0: { label: '—',           color: '#cbd5e1', width: '0%',   hint: 'Mật khẩu cần ít nhất 8 ký tự, chữ hoa, số và ký tự đặc biệt', cls: '' },
    1: { label: 'Yếu',        color: '#ef4444', width: '20%',  hint: 'Mật khẩu quá yếu — dễ bị bẻ khóa trong vài giây', cls: 'strength-weak' },
    2: { label: 'Trung bình', color: '#f59e0b', width: '45%',  hint: 'Thêm chữ hoa, số hoặc ký tự đặc biệt để tăng độ bảo mật', cls: 'strength-medium' },
    3: { label: 'Mạnh',       color: '#3b82f6', width: '70%',  hint: 'Khá tốt — thêm ký tự đặc biệt để đạt mức tối ưu', cls: 'strength-strong' },
    4: { label: 'Rất mạnh',   color: '#10b981', width: '100%', hint: 'Tuyệt vời! Mật khẩu đạt tiêu chuẩn bảo mật cao nhất', cls: 'strength-very-strong' },
    5: { label: 'Rất mạnh',   color: '#10b981', width: '100%', hint: 'Tuyệt vời! Mật khẩu đạt tiêu chuẩn bảo mật cao nhất', cls: 'strength-very-strong' }
};

function handlePasswordInput(value) {
    const box   = document.getElementById('strengthBox');
    const bar   = document.getElementById('strengthBar');
    const label = document.getElementById('strengthLabel');
    const hint  = document.getElementById('strengthHint');

    if (!value) {
        box.style.opacity = '0';
        return;
    }

    box.style.opacity = '1';

    const result = evaluatePasswordStrength(value);
    const score  = Math.min(result.score, 5);
    const cfg    = strengthConfig[score];

    label.textContent       = cfg.label;
    label.className         = 'text-xs font-600 ' + cfg.cls;
    bar.style.width         = cfg.width;
    bar.style.backgroundColor = cfg.color;
    bar.style.boxShadow     = score > 0 ? `0 0 8px ${cfg.color}40` : 'none';
    hint.textContent        = cfg.hint;
    hint.className          = 'text-[11px] mt-1.5 transition-all ' + (cfg.cls || 'text-slate-400');
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
function onRegisterSubmit(e) {
    e.preventDefault();
    const pass   = document.getElementById('regPassword').value;
    const result = evaluatePasswordStrength(pass);

    if (result.score < 2) {
        showToast('Mật khẩu quá yếu! Cần ít nhất 8 ký tự, chữ hoa, chữ thường và chữ số.', true);
        return;
    }

    const name = document.getElementById('regName').value;
    showToast(`Chào mừng ${name}! Tài khoản ShopAI đã được tạo thành công.`);
}

function onLoginSubmit(e) {
    e.preventDefault();
    showToast('Đăng nhập thành công! Đang chuyển hướng đến trang chính...');
}
