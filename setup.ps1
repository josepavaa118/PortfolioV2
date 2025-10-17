# Portfolio V3 Setup Script for Windows
Write-Host "🚀 Setting up Portfolio V3..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check Node.js version
$versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($versionNumber -lt 18) {
    Write-Host "❌ Node.js version 18+ is required. Current version: $nodeVersion" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Try different installation methods
$success = $false

# Method 1: Try with legacy peer deps
try {
    npm install --legacy-peer-deps
    Write-Host "✅ Dependencies installed successfully with --legacy-peer-deps" -ForegroundColor Green
    $success = $true
} catch {
    Write-Host "⚠️ Method 1 failed, trying Method 2..." -ForegroundColor Yellow
    
    # Method 2: Try with force
    try {
        npm install --force
        Write-Host "✅ Dependencies installed successfully with --force" -ForegroundColor Green
        $success = $true
    } catch {
        Write-Host "⚠️ Method 2 failed, trying Method 3..." -ForegroundColor Yellow
        
        # Method 3: Try yarn if available
        try {
            yarn install
            Write-Host "✅ Dependencies installed successfully with yarn" -ForegroundColor Green
            $success = $true
        } catch {
            Write-Host "⚠️ Method 3 failed, trying minimal setup..." -ForegroundColor Yellow
            
            # Method 4: Use minimal package.json
            try {
                Copy-Item package-minimal.json package.json -Force
                npm install --legacy-peer-deps
                Write-Host "✅ Dependencies installed successfully with minimal setup" -ForegroundColor Green
                Write-Host "⚠️ Using minimal setup (without Sanity CMS)" -ForegroundColor Yellow
                $success = $true
            } catch {
                Write-Host "❌ All installation methods failed" -ForegroundColor Red
                $success = $false
            }
        }
    }
}

if (-not $success) {
    Write-Host "❌ Setup failed. Please try manual installation:" -ForegroundColor Red
    Write-Host "1. Delete node_modules folder" -ForegroundColor Yellow
    Write-Host "2. Delete package-lock.json" -ForegroundColor Yellow
    Write-Host "3. Run: npm install --legacy-peer-deps" -ForegroundColor Yellow
    exit 1
}

# Create environment file if it doesn't exist
if (-not (Test-Path .env.local)) {
    Copy-Item env.example .env.local
    Write-Host "📝 Created .env.local file. Please update with your Sanity credentials." -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env.local with your Sanity credentials (optional)" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For Sanity CMS setup:" -ForegroundColor Cyan
Write-Host "1. Create account at https://sanity.io" -ForegroundColor White
Write-Host "2. Create new project" -ForegroundColor White
Write-Host "3. Update .env.local with your project details" -ForegroundColor White
Write-Host "4. Run 'npx sanity deploy' to deploy your CMS" -ForegroundColor White

