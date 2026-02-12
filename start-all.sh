#!/bin/bash
# Development server startup script for Smart Calis

echo "╔════════════════════════════════════════════════╗"
echo "║     Smart Calis - Starting All Services        ║"
echo "║     Open 3 terminal windows for each service   ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "Terminal 1: Backend"
echo "Terminal 2: Frontend"
echo "Terminal 3: ML Service"
echo ""

# Function to start a service
start_service() {
    local name=$1
    local cmd=$2
    local dir=$3
    
    echo "Starting $name..."
    cd "$dir"
    eval "$cmd" &
    cd - > /dev/null
}

# This script should be run once with separate terminals for each service
# Or modify to open new terminal windows

# Start Backend
echo "→ Starting Backend on port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 2

# Start Frontend
echo "→ Starting Frontend on port 3000..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 2

# Start ML Service
echo "→ Starting ML Service on port 5001..."
cd ml-service
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi
python app.py &
ML_PID=$!
cd ..

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║     All Services Started!                      ║"
echo "║     Backend: http://localhost:5000             ║"
echo "║     Frontend: http://localhost:3000            ║"
echo "║     ML Service: http://localhost:5001          ║"
echo "║     Press Ctrl+C to stop all services          ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Wait for all background jobs
wait
