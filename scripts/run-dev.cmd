@echo off

:: Start Flask application in a new command prompt window
start cmd /k "flask run"

:: Change directory and start pnpm dev in the same command prompt window
cd client
start cmd /k "pnpm dev"

:: Keep the current command prompt window open
pause
