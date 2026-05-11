# Vercel deployment script
# This script helps deploy AssetTrack to Vercel

#!/bin/bash

echo "🚀 AssetTrack Vercel Deployment Helper"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "📁 Navigating to project root..."
cd "$(dirname "$0")" || exit

echo ""
echo "🔍 Git Status:"
git status

echo ""
echo "📤 Ready to deploy! Run one of these commands:"
echo ""
echo "Option 1: Deploy with Vercel CLI"
echo "  vercel --prod"
echo ""
echo "Option 2: Deploy frontend only"
echo "  vercel frontend --prod"
echo ""
echo "Option 3: Just build locally (no deploy)"
echo "  npm run build"
echo ""
echo "📝 After deployment:"
echo "  1. Add VITE_API_URL environment variable in Vercel dashboard"
echo "  2. Deploy your backend to Azure/AWS/Railway/Cloud Run"
echo "  3. Update VITE_API_URL with your backend URL"
echo ""
