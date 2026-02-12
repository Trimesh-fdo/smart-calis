#!/bin/bash
# Setup script for Smart Calis development environment

echo "╔════════════════════════════════════════════════╗"
echo "║     Smart Calis Development Setup              ║"
echo "║     This script initializes all services       ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Setup Frontend
echo -e "${BLUE}[1/3]${NC} Setting up Frontend..."
cd frontend
npm install
cp .env.local.example .env.local
cd ..
echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Step 2: Setup Backend
echo -e "${BLUE}[2/3]${NC} Setting up Backend..."
cd backend
npm install
cp .env.example .env
cd ..
echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Step 3: Setup ML Service
echo -e "${BLUE}[3/3]${NC} Setting up ML Service..."
cd ml-service
# Create virtual environment if Python is available
if command -v python3 &> /dev/null; then
    python3 -m venv venv
    # Activate venv and install requirements
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
    pip install -r requirements-dev.txt
    cp .env.example .env
    deactivate
    echo -e "${GREEN}✓ ML Service setup complete${NC}"
else
    echo -e "${YELLOW}⚠ Python not found. Please install Python 3.10+ and run setup manually.${NC}"
fi
cd ..
echo ""

echo "╔════════════════════════════════════════════════╗"
echo "║     Setup Complete!                            ║"
echo "║     Next Steps:                                ║"
echo "║     1. Update .env files with your settings    ║"
echo "║     2. Run: npm run dev (in each folder)       ║"
echo "║     3. Or use: npm run start-all               ║"
echo "╚════════════════════════════════════════════════╝"
