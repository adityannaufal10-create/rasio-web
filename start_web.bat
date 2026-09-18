@echo off
title RASIO 10.0 - Web Interaktif Sistem Pangan ASEAN
echo ===================================================
echo   Menjalankan Server Web RASIO 10.0 ...
echo ===================================================
set "PATH=%~dp0..\tools\node-v20.18.0-win-x64;%PATH%"
cd /d "%~dp0"
echo Membuka browser pada http://localhost:5173 ...
start "" "http://localhost:5173"
npm run dev
pause
