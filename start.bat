@echo off
echo Installing ConnectCare dependencies...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH.
    pause
    exit /b 1
)

echo Node.js and npm are installed. Installing dependencies...
echo.

REM Install dependencies
npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to install dependencies.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo Starting development server...
echo The application will open at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server.
echo.

REM Start the development server
npm run dev

pause
