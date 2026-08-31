function evaluatePasswordStrength(password) {
    if (!password) {
        return { score: 0, label: 'Chưa nhập', color: '#94a3b8', rules: { hasMin: false, hasUpper: false, hasLower: false, hasNumber: false, hasSpecial: false } };
    }

    const rules = {
        hasMin: password.length >= 8,
        hasUpper: /[A-Z]/.test(password),
        hasLower: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;
    if (rules.hasMin) score++;
    if (rules.hasUpper) score++;
    if (rules.hasLower) score++;
    if (rules.hasNumber) score++;
    if (rules.hasSpecial) score++;

    let label = 'Yếu';
    let color = '#ef4444'; // Red

    if (score <= 2) {
        label = 'Yếu ❌';
        color = '#ef4444';
    } else if (score === 3) {
        label = 'Trung Bình ⚠️';
        color = '#f59e0b'; // Yellow
    } else if (score === 4) {
        label = 'Mạnh 💪';
        color = '#3b82f6'; // Blue
    } else if (score >= 5) {
        label = 'Rất Mạnh 🛡️';
        color = '#10b981'; // Green
    }

    return { score, label, color, rules };
}

if (typeof module !== 'undefined') {
    module.exports = { evaluatePasswordStrength };
}
