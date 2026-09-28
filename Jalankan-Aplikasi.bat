@echo off
title KREASI STIK PINTAR - Media Edukasi Matematika & STEAM Kelas 2 SD
echo ========================================================
echo Membuka Aplikasi KREASI STIK PINTAR...
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
if %ERRORLEVEL% NEQ 0 (
    echo Menjalankan mode peramban langsung...
    start "" "%~dp0index.html"
)
pause
