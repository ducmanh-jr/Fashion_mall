@echo off
chcp 65001 >nul
title DM Fashion Data Tools - He Thong Khoi Chay Tu Dong
color 0B

echo ===============================================================================
echo          DM FASHION DATA TOOLS - STUDIO TRÍCH XUẤT DỮ LIỆU TOÀN DIỆN
echo               (Hồ sơ cơ sở Châu Á & Dữ liệu sản phẩm 100% mọi trường)
echo ===============================================================================
echo.

:: 1. KIEM TRA MOI TRUONG JAVA
echo [1/4] Kiem tra moi truong Java...
where java >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [LOI] Khong tim thay Java tren may tinh!
    echo Vui long cai dat Java (JDK 21 tro len) de chay he thong.
    echo Tai Java tai: https://www.oracle.com/java/technologies/downloads/
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('java -version 2^>^&1') do (
    set "JAVA_VER=%%i"
    goto :got_java
)
:got_java
echo       - Da phat hien: %JAVA_VER%
echo.

:: 2. KIEM TRA MOI TRUONG PYTHON
echo [2/4] Kiem tra moi truong Python (Bo cao du lieu)...
set "PY_CMD="
where py >nul 2>nul
if %errorlevel% equ 0 (
    set "PY_CMD=py"
) else (
    where python >nul 2>nul
    if %errorlevel% equ 0 (
        set "PY_CMD=python"
    )
)

if defined PY_CMD (
    for /f "tokens=*" %%p in ('%PY_CMD% --version 2^>^&1') do (
        echo       - Da phat hien: %%p (Lenh: %PY_CMD%)
    )
) else (
    echo       - [CANH BAO] Khong tim thay Python. Mot so tac vu cao co the bi han che.
)
echo.

:: 3. KIEM TRA FILE DONG GOI JAR
echo [3/4] Kiem tra goi ung dung he thong...
if "%1"=="--build" goto :do_build
if "%1"=="-b" goto :do_build

if exist "target\datatools-1.0.0.jar" (
    echo       - Tim thay file chay: target\datatools-1.0.0.jar (San sang khoi dong nhanh)
    goto :start_app
)

:do_build
echo       - Chua co file JAR hoac yeu cau bien dich lai. Dang build voi Maven...
call .\mvnw.cmd package -DskipTests
if %errorlevel% neq 0 (
    color 0C
    echo [LOI] Qua trinh bien dich Maven gap su co!
    pause
    exit /b 1
)
echo       - Bien dich hoan tat thanh cong!

:start_app
echo.
:: 4. TU DONG MO TRINH DUYET & KHOI CHAY HE THONG
echo [4/4] Khoi chay may chu DM Fashion Studio...
echo       - Dia chi truy cap: http://localhost:8080
echo       - Trinh duyet se tu dong mo sau 4 giay...
echo.
echo ===============================================================================
echo   HE THONG DANG CHAY. NHAN CTRL + C TREN CUA SO NAY NEU MUON DUNG HE THONG.
echo ===============================================================================
echo.

:: Mo trinh duyet sau 4 giay trong nen
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:8080"

:: Chay Spring Boot
java -jar target\datatools-1.0.0.jar

echo.
echo He thong da dung. Cam on ban da su dung DM Fashion Data Tools!
pause
