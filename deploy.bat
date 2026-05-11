# Vercel deployment script for Windows
# This script helps deploy AssetTrack to Vercel

@echo off
cls
echo.
echo 🚀 AssetTrack Vercel Deployment Helper
echo ======================================
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if errorlevel 1 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

echo 📁 Project ready for deployment
echo.
echo 🔍 Git Status:
git status

echo.
echo 📤 Ready to deploy! Run one of these commands:
echo.
echo Option 1: Deploy with Vercel CLI (Recommended)
echo   vercel --prod
echo.
echo Option 2: Interactive deployment
echo   vercel
echo.
echo Option 3: Just build locally ^(no deploy^)
echo   npm run build
echo.
echo 📝 After deployment:
echo   1. Add VITE_API_URL environment variable in Vercel dashboard
echo   2. Deploy your backend to Azure/AWS/Railway/Cloud Run
echo   3. Update VITE_API_URL with your backend URL
echo.
pause
