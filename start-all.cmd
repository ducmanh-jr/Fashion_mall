@echo off
chcp 65001 >nul
title Aethelgard Shopping Mall - Trinh Dieu Phoi He Thong
color 0B

pushd "%~dp0"

echo ===============================================================================
echo          AETHELGARD SHOPPING MALL - HE THONG THUONG MAI DIEN TU TICH HOP AI
echo               Lap trinh vien: Nguyen Duc Manh
echo               Vai tro: Phan he Nguoi Ban va He thong Loi E-Commerce
echo ===============================================================================
echo.
echo [*] Thu muc: %cd%
echo [*] Dang khoi dong Backend va Frontend...
echo.

:: 1. Mo cua so Backend
start "[1/2] Backend .NET (Port 5000)" cmd /k "cd /d "%~dp0backend" && dotnet run --project src\Ecommerce.API\Ecommerce.API.csproj --launch-profile http"

echo [*] Doi Backend khoi dong (4 giay)...
timeout /t 4 /nobreak >nul

:: 2. Mo cua so Frontend
start "[2/2] Frontend Next.js (Port 3000)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo [*] Doi Frontend san sang (4 giay)...
timeout /t 4 /nobreak >nul

:: 3. Mo trinh duyet
start "" http://localhost:3000

echo.
echo ===============================================================================
echo   HE THONG DA KHOI DONG XONG!
echo   - Frontend: http://localhost:3000
echo   - Backend:  http://localhost:5000 (Swagger: http://localhost:5000/swagger)
echo ===============================================================================
echo.
echo Nhan phim bat ky de dong cua so dieu phoi nay (2 cua so Web API va Next.js van tiep tuc chay).
pause >nul
popd
