#!/bin/bash

# CORS Testing Script for Render Deployment
echo "🔧 Testing CORS Configuration"
echo "============================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKEND_URL="https://reactjs-quiz-backend.onrender.com"
FRONTEND_URL="https://reactjs-quiz-n7ep.onrender.com"

echo -e "${BLUE}Backend URL: $BACKEND_URL${NC}"
echo -e "${BLUE}Frontend URL: $FRONTEND_URL${NC}"

# Test 1: Health Check
echo -e "\n${BLUE}Test 1: Backend Health Check${NC}"
response=$(curl -s -w "%{http_code}" "$BACKEND_URL/api/health" -o /tmp/health_response.json)
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    cat /tmp/health_response.json
else
    echo -e "${RED}❌ Backend health check failed (HTTP $response)${NC}"
fi

# Test 2: CORS Preflight Request
echo -e "\n${BLUE}Test 2: CORS Preflight Request${NC}"
cors_response=$(curl -s -w "%{http_code}" \
    -H "Origin: $FRONTEND_URL" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type" \
    -X OPTIONS \
    "$BACKEND_URL/api/auth/validate" \
    -o /tmp/cors_response.txt)

if [ "$cors_response" = "200" ]; then
    echo -e "${GREEN}✅ CORS preflight successful${NC}"
else
    echo -e "${RED}❌ CORS preflight failed (HTTP $cors_response)${NC}"
fi

# Test 3: Actual API Request with Origin
echo -e "\n${BLUE}Test 3: API Request with CORS Headers${NC}"
api_response=$(curl -s -w "%{http_code}" \
    -H "Origin: $FRONTEND_URL" \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"identifier": "admin_2025_reactjs_quiz"}' \
    "$BACKEND_URL/api/auth/validate" \
    -o /tmp/api_response.json)

if [ "$api_response" = "200" ]; then
    echo -e "${GREEN}✅ API request successful${NC}"
    cat /tmp/api_response.json
else
    echo -e "${RED}❌ API request failed (HTTP $api_response)${NC}"
    cat /tmp/api_response.json
fi

# Test 4: Check CORS Headers
echo -e "\n${BLUE}Test 4: CORS Headers Check${NC}"
cors_headers=$(curl -s -I \
    -H "Origin: $FRONTEND_URL" \
    -X OPTIONS \
    "$BACKEND_URL/api/auth/validate" | grep -i "access-control")

if [ -n "$cors_headers" ]; then
    echo -e "${GREEN}✅ CORS headers present:${NC}"
    echo "$cors_headers"
else
    echo -e "${RED}❌ No CORS headers found${NC}"
fi

echo -e "\n${BLUE}Summary:${NC}"
echo "If all tests pass, your CORS issue should be resolved."
echo "If tests fail, check the Render backend environment variables:"
echo "  FRONTEND_URL=$FRONTEND_URL"
echo "  NODE_ENV=production"

echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Commit and push the CORS fix"
echo "2. Wait for backend to redeploy on Render"
echo "3. Test your frontend application"
echo "4. Update Render environment variables if needed"
