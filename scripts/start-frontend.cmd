@echo off
chcp 65001 >nul
title [2/2] Frontend Next.js - Port 3000
color 0B

:: Chuyen thu muc den frontend
pushd "%~dp0..\frontend"

echo ===============================================================================
echo          AETHELGARD SHOPPING MALL - FRONTEND WEB (NEXT.JS + REACT 19)
echo               Lap trinh vien: Nguyen Duc Manh (Phan he Nguoi Ban va Loi E-Commerce)
echo ===============================================================================
echo.
echo [*] Thu muc lam viec: %cd%
echo [*] Kiem tra Node.js:
node -v
if %errorlevel% neq 0 (
    echo [!] Khong tim thay Node.js!
    pause
    popd
    exit /b 1
)

echo.
echo [*] Dang khoi dong Web Portal tai: http://localhost:3000
echo.
echo [Chu y]: Giu nguyen cua so nay de Frontend hoat dong.
echo.

npm run dev
if %errorlevel% neq 0 (
    echo.
    echo [!] Da co su co khi chay Frontend.
    pause
)

popd
