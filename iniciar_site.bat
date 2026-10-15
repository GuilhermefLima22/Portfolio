@echo off
title Portfolio Guilherme - Servidor Local
set "PATH=C:\Program Files\nodejs;%APPDATA%\npm;%PATH%"
cd /d "%~dp0"

echo ========================================================
echo       Iniciando Servidor do Portfolio (Vite + React)
echo ========================================================
echo.
echo Abrindo o site no seu navegador em http://localhost:5173 ...
timeout /t 2 >nul
start http://localhost:5173
echo.
echo [INFO] Servidor rodando! Deixe esta janela aberta para manter o site ligado.
echo.
call npm run dev
pause
