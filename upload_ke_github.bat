@echo off
title Upload Proyek RASIO 10.0 ke GitHub
echo ========================================================
echo   Mengirim (Push) Kode ke Repositori GitHub Anda...
echo ========================================================
set "PATH=%~dp0..\tools\git\cmd;%PATH%"
cd /d "%~dp0"

echo Menghubungkan ke https://github.com/adityannaufal10-create/rasio-web.git ...
git push -u origin main

echo.
echo ========================================================
echo   SELESAI! Silakan buka kembali browser Anda di:
echo   https://github.com/adityannaufal10-create/rasio-web
echo ========================================================
pause
