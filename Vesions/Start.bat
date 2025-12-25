@echo off
title Laptop Shop Server
echo ---------------------------------------------------
echo DANG KHOI DONG WEB BAN HANG...
echo Vui long doi khoang 10-15 giay de server bat len...
echo ---------------------------------------------------

start "" /b cmd /c "timeout /nobreak /t 15 >nul && start http://localhost:8088"

:: --- LỆNH CHẠY SERVER ---
java -Dfile.encoding=UTF-8 -jar laptop-shop-backend-1.0.0.jar

pause