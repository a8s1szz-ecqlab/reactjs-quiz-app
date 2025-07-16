#!/bin/bash

# Render Environment Variable Checker and Fixer
echo "🔍 Checking Render Environment Variables"
echo "========================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKEND_URL="https://reactjs-quiz-backend.onrender.com"
FRONTEND_URL="https://reactjs-quiz-n7ep.onrender.com"

echo -e "${BLUE}Your Services:${NC}"
echo -e "Backend:  $BACKEND_URL"
echo -e "Frontend: $FRONTEND_URL"

echo -e "\n${BLUE}Step 1: Testing Current API Configuration${NC}"

# Test if the API is responding
echo -e "${YELLOW}Testing backend health...${NC}"
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/health" -o /tmp/health.json)

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Backend is responding${NC}"
    cat /tmp/health.json | jq '.' 2>/dev/null || cat /tmp/health.json
else
    echo -e "${RED}❌ Backend health check failed (HTTP $HEALTH_RESPONSE)${NC}"
fi

echo -e "\n${BLUE}Step 2: Testing CORS from Frontend Origin${NC}"
CORS_TEST=$(curl -s -w "%{http_code}" \
    -H "Origin: $FRONTEND_URL" \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"identifier": "admin_2025_reactjs_quiz"}' \
    "$BACKEND_URL/api/auth/validate" \
    -o /tmp/cors_test.json)

if [ "$CORS_TEST" = "200" ]; then
    echo -e "${GREEN}✅ CORS working correctly${NC}"
    cat /tmp/cors_test.json | jq '.' 2>/dev/null || cat /tmp/cors_test.json
else
    echo -e "${RED}❌ CORS test failed (HTTP $CORS_TEST)${NC}"
    echo -e "${YELLOW}Response:${NC}"
    cat /tmp/cors_test.json
fi

echo -e "\n${BLUE}Step 3: Render CLI Commands to Fix Environment Variables${NC}"

echo -e "\n${YELLOW}For Backend Service (run these if CORS failed):${NC}"
echo "render services env set reactjs-quiz-backend NODE_ENV=production"
echo "render services env set reactjs-quiz-backend FRONTEND_URL=$FRONTEND_URL"
echo "render services env set reactjs-quiz-backend DATA_DIR=/opt/render/project/src/data"

echo -e "\n${YELLOW}For Frontend Service:${NC}"
echo "render services env set reactjs-quiz-frontend VITE_API_URL=$BACKEND_URL/api"

echo -e "\n${YELLOW}After setting environment variables:${NC}"
echo "render services restart reactjs-quiz-backend"
echo "render services restart reactjs-quiz-frontend"

echo -e "\n${BLUE}Step 4: Manual Environment Variable Check${NC}"
echo -e "${YELLOW}Check your Render Dashboard:${NC}"
echo "1. Go to https://dashboard.render.com"
echo "2. Click on your backend service"
echo "3. Go to Environment tab"
echo "4. Verify these variables exist:"
echo "   NODE_ENV = production"
echo "   FRONTEND_URL = $FRONTEND_URL"
echo "   DATA_DIR = /opt/render/project/src/data"
echo ""
echo "5. Click on your frontend service"
echo "6. Go to Environment tab"
echo "7. Verify this variable exists:"
echo "   VITE_API_URL = $BACKEND_URL/api"

echo -e "\n${BLUE}Step 5: Debug Your Frontend${NC}"
echo -e "${YELLOW}Access debug tool at:${NC}"
echo "$FRONTEND_URL/debug-api.html"
echo ""
echo -e "${YELLOW}Or test manually:${NC}"
echo "1. Open browser console on $FRONTEND_URL"
echo "2. Run: console.log(import.meta.env)"
echo "3. Check if VITE_API_URL is set correctly"

echo -e "\n${BLUE}Step 6: Force Rebuild (if environment variables were wrong)${NC}"
echo -e "${YELLOW}If VITE_API_URL was missing during build:${NC}"
echo "1. Set the correct VITE_API_URL in Render frontend service"
echo "2. Force a new deployment:"
echo "   - Push a small change to your repository, OR"
echo "   - Use Render dashboard to trigger manual deploy"

echo -e "\n${GREEN}🎯 Summary:${NC}"
echo -e "The issue is likely that VITE_API_URL wasn't set when your frontend was built."
echo -e "Vite environment variables are resolved at BUILD TIME, not runtime."
echo -e "If the variable was missing during build, you need to rebuild the frontend."

cleanup() {
    rm -f /tmp/health.json /tmp/cors_test.json
}

trap cleanup EXIT
