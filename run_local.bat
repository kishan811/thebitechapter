@echo off
cd /d "%~dp0"
set PORT=8000
echo =======================================================
echo Starting The Bite Chapter locally...
echo Opening: http://localhost:8000
echo =======================================================
start http://localhost:8000
python server.py
pause
