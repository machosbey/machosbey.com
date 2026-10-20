@echo off
cd /d "%~dp0"
set "MACHOS_MOBILE_PREVIEW=1"
call npm.cmd run build
if errorlevel 1 (
 pause
 exit /b 1
)
echo Mobile production preview: http://localhost:3001
call npm.cmd run start -- --hostname 0.0.0.0 -p 3001
pause
