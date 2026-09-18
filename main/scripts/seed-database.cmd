@echo off
chcp 65001 >nul
title Nạp Dữ Liệu CSDL - Aethelgard Mall
color 0E

echo ===============================================================================
echo          TOOL NẠP DỮ LIỆU CƠ SỞ DỮ LIỆU TỪ BẢN PHÁC THẢO (DATABASE SEEDER)
echo               Lập trình viên phụ trách: Nguyễn Đức Mạnh
echo ===============================================================================
echo.

echo [*] Đang gửi yêu cầu nạp 20 sản phẩm, đơn hàng FedEx, boutique store vào CSDL...
curl -X POST "http://localhost:5000/api/seed/run" -H "accept: */*"
echo.
echo [*] Quá trình nạp dữ liệu hoàn tất!
pause
