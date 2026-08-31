const express = require('express');
const http = require('http');
const jwt = require('jsonwebtoken');
const { authenticateToken, requireRole, JWT_SECRET } = require('../mã nguồn/route-guard');

console.log("===============================================================");
console.log("🧪 KIỂM THỬ THỰC NGHIỆM TASK 2: HTTMDTTHA-9 (Route Guards & RBAC)");
console.log("===============================================================\n");

const app = express();
app.use(express.json());

app.get('/api/admin/dashboard', authenticateToken, requireRole(['admin']), (req, res) => {
    res.json({ success: true, message: 'Chào mừng Admin' });
});

const server = app.listen(3002, async () => {
    let passed = 0;
    let failed = 0;

    function assert(cond, msg) {
        if (cond) { console.log(`  ✅ [PASS] ${msg}`); passed++; }
        else { console.error(`  ❌ [FAIL] ${msg}`); failed++; }
    }

    function req(path, token = null) {
        return new Promise((resolve) => {
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            http.get({ hostname: 'localhost', port: 3002, path, headers }, (res) => {
                let d = ''; res.on('data', c => d += c);
                res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(d) }));
            });
        });
    }

    try {
        // Test 1: No token
        const r1 = await req('/api/admin/dashboard');
        assert(r1.status === 401, "Chặn truy cập Unauthenticated (HTTP 401).");

        // Test 2: Customer token
        const custToken = jwt.sign({ id: 'c1', role: 'customer' }, JWT_SECRET);
        const r2 = await req('/api/admin/dashboard', custToken);
        assert(r2.status === 403, "Chặn Customer vào trang Admin (HTTP 403 Forbidden).");

        // Test 3: Admin token
        const adminToken = jwt.sign({ id: 'a1', role: 'admin' }, JWT_SECRET);
        const r3 = await req('/api/admin/dashboard', adminToken);
        assert(r3.status === 200 && r3.body.success, "Cho phép Admin truy cập Admin Dashboard (HTTP 200 OK).");

        console.log(`\n📊 Kết quả Task 2: ${passed}/${passed + failed} PASS\n`);
        server.close();
        process.exit(failed === 0 ? 0 : 1);
    } catch (e) {
        console.error(e);
        server.close();
        process.exit(1);
    }
});
