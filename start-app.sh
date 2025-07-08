#!/bin/bash

echo "🚀 Starting ReactJS Quiz Application..."

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use"
        return 0
    else
        echo "Port $1 is available"
        return 1
    fi
}

# Kill any existing processes
echo "🔄 Cleaning up existing processes..."
pkill -f "node.*server.js" || true
pkill -f "vite.*dev" || true

# Wait a moment for processes to terminate
sleep 2

# Start backend server
echo "🔧 Starting backend server on port 3001..."
cd backend
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend started successfully
if check_port 3001; then
    echo "✅ Backend server started successfully"
else
    echo "❌ Failed to start backend server"
    exit 1
fi

# Go back to root directory
cd ..

# Start frontend server
echo "🎨 Starting frontend server on port 5173..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 3

# Check if frontend started successfully
if check_port 5173; then
    echo "✅ Frontend server started successfully"
else
    echo "❌ Failed to start frontend server"
    kill $BACKEND_PID
    exit 1
fi

echo ""
echo "🎉 ReactJS Quiz Application is now running!"
echo ""
echo "📊 Backend API: http://localhost:3001/api"
echo "🌐 Frontend App: http://localhost:5173"
echo ""
echo "💡 Available API endpoints:"
echo "   GET  /api/health       - Health check"
echo "   GET  /api/quiz/start   - Start a new quiz"
echo "   POST /api/quiz/submit  - Submit quiz answers"
echo "   GET  /api/quiz/stats   - Get quiz statistics"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Keep script running
wait
