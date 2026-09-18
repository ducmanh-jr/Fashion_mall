@echo off
chcp 65001 >nul
title [1/2] Backend .NET Web API - Port 5000
color 0A

cd /d "%~dp0"
cd ..\backend

echo ===============================================================================
echo          AETHELGARD SHOPPING MALL - BACKEND WEB API (.NET 10 N-TIER)
echo               Lap trinh vien: Nguyen Duc Manh (Core va Seller System)
echo ===============================================================================
echo.
echo [*] Thu muc hien tai: %cd%
echo [*] Kiem tra .NET SDK:
dotnet --version
echo.
echo [*] Dang khoi dong Web API tai: http://localhost:5000
echo [*] Swagger API Explorer:       http://localhost:5000/swagger
echo.
echo [Chu y]: Giu nguyen cua so nay de Backend luon hoat dong.
echo.

dotnet run --project "src\Ecommerce.API\Ecommerce.API.csproj" --launch-profile http
if %errorlevel% neq 0 (
    echo.
    echo [!] Da co su co khi chay Backend!
    pause
)
