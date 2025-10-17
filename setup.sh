#!/bin/bash

echo "🚀 Setting up Portfolio V3..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Try different installation methods
echo "📦 Installing dependencies..."

# Method 1: Try with legacy peer deps
if npm install --legacy-peer-deps; then
    echo "✅ Dependencies installed successfully with --legacy-peer-deps"
elif npm install --force; then
    echo "✅ Dependencies installed successfully with --force"
elif yarn install; then
    echo "✅ Dependencies installed successfully with yarn"
else
    echo "❌ Failed to install dependencies. Trying minimal setup..."
    
    # Use minimal package.json
    cp package-minimal.json package.json
    npm install --legacy-peer-deps
    
    echo "⚠️  Using minimal setup (without Sanity CMS)"
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo "📝 Created .env.local file. Please update with your Sanity credentials."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Sanity credentials (optional)"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For Sanity CMS setup:"
echo "1. Create account at https://sanity.io"
echo "2. Create new project"
echo "3. Update .env.local with your project details"
echo "4. Run 'npx sanity deploy' to deploy your CMS"

