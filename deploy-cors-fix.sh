#!/bin/bash

# Update Render Deployment with CORS Fix
echo "🚀 Updating Render Deployment with CORS Fix"
echo "============================================"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Your URLs
BACKEND_URL="https://reactjs-quiz-backend.onrender.com"
FRONTEND_URL="https://reactjs-quiz-n7ep.onrender.com"

echo -e "${BLUE}Step 1: Committing CORS fixes...${NC}"
git add .
git commit -m "Fix CORS configuration for Render deployment

- Update CORS origin function to handle onrender.com domains
- Add specific frontend URL to allowed origins
- Update environment variables with correct URLs
- Add CORS testing script"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Changes committed${NC}"
else
    echo -e "${YELLOW}⚠️  No changes to commit or commit failed${NC}"
fi

echo -e "\n${BLUE}Step 2: Pushing to repository...${NC}"
git push origin dev

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Pushed to repository${NC}"
else
    echo -e "${RED}❌ Failed to push to repository${NC}"
    exit 1
fi

echo -e "\n${BLUE}Step 3: Render will auto-deploy backend...${NC}"
echo -e "${YELLOW}⏱️  Backend deployment usually takes 2-5 minutes${NC}"
echo -e "${YELLOW}📍 Monitor deployment at: https://dashboard.render.com${NC}"

echo -e "\n${BLUE}Step 4: Testing CORS after deployment...${NC}"
echo -e "${YELLOW}Wait 3-5 minutes for deployment, then run:${NC}"
echo -e "${YELLOW}./test-cors-fix.sh${NC}"

echo -e "\n${BLUE}Step 5: Update Render Environment Variables (Optional)${NC}"
echo -e "${YELLOW}If CORS still fails, update these in Render Dashboard:${NC}"
echo -e "Backend Service Environment Variables:"
echo -e "  FRONTEND_URL = $FRONTEND_URL"
echo -e "  NODE_ENV = production"

echo -e "\n${GREEN}🎉 CORS fix deployment initiated!${NC}"

echo -e "\n${BLUE}What was fixed:${NC}"
echo -e "✅ CORS origin function now properly handles .onrender.com domains"
echo -e "✅ Added your specific frontend URL: $FRONTEND_URL"
echo -e "✅ Updated environment variables"
echo -e "✅ Enhanced CORS headers for better compatibility"

echo -e "\n${BLUE}Verification URLs:${NC}"
echo -e "Backend Health: $BACKEND_URL/api/health"
echo -e "Frontend App: $FRONTEND_URL"

echo -e "\n${YELLOW}Timeline:${NC}"
echo -e "⏱️  Now: Code pushed to repository"
echo -e "⏱️  ~2-5 min: Render auto-deploys backend"
echo -e "⏱️  ~5 min: Run CORS test script"
echo -e "⏱️  ~6 min: Test frontend application"
