@echo off
REM Setup script for Smart Calis development environment (Windows)

echo.
echo ╔════════════════════════════════════════════════╗
echo ║     Smart Calis Development Setup              ║
echo ║     This script initializes all services       ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Step 1: Setup Frontend
echo [1/3] Setting up Frontend...
cd frontend
call npm install
if not exist ".env.local" (
    copy .env.local.example .env.local
)
cd ..
echo ✓ Frontend setup complete
echo.

REM Step 2: Setup Backend
echo [2/3] Setting up Backend...
cd backend
call npm install
if not exist ".env" (
    copy .env.example .env
)
cd ..
echo ✓ Backend setup complete
echo.

REM Step 3: Setup ML Service
echo [3/3] Setting up ML Service...
cd ml-service
if exist python (
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements-dev.txt
    if not exist ".env" (
        copy .env.example .env
    )
    call deactivate
    echo ✓ ML Service setup complete
) else (
    echo ⚠ Python not found. Please install Python 3.10+ and run setup manually.
)
cd ..
echo.

echo ╔════════════════════════════════════════════════╗
echo ║     Setup Complete!                            ║
echo ║     Next Steps:                                ║
echo ║     1. Update .env files with your settings    ║
echo ║     2. Run: npm run dev in each folder         ║
echo ║     3. Or use: npm run start-all               ║
echo ╚════════════════════════════════════════════════╝
