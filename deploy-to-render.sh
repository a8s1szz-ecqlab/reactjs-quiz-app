#!/bin/bash

# Render CLI Deployment Script for ReactJS Quiz App
# This script will deploy both backend and frontend to Render

echo "🚀 ReactJS Quiz App - Render Deployment Script"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if logged in to Render
echo -e "${BLUE}Checking Render CLI authentication...${NC}"
if ! render whoami &>/dev/null; then
    echo -e "${YELLOW}⚠️  You need to login to Render first${NC}"
    echo -e "${YELLOW}Run: render login${NC}"
    echo -e "${YELLOW}Or visit: https://dashboard.render.com/device-authorization${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Authenticated with Render${NC}"

# Function to deploy backend
deploy_backend() {
    echo -e "\n${BLUE}🔧 Deploying Backend Service...${NC}"
    
    # Navigate to backend directory
    cd backend
    
    # Create service using Render CLI
    echo -e "${YELLOW}Creating backend web service...${NC}"
    render services create web \
        --name "reactjs-quiz-backend" \
        --repo "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" \
        --branch "main" \
        --root-dir "backend" \
        --build-command "npm install" \
        --start-command "npm start" \
        --plan "free" \
        --env-var "NODE_ENV=production" \
        --env-var "DATA_DIR=/opt/render/project/src/data" \
        --health-check-path "/api/health"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend service created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create backend service${NC}"
        return 1
    fi
    
    cd ..
}

# Function to deploy frontend
deploy_frontend() {
    echo -e "\n${BLUE}🎨 Deploying Frontend Service...${NC}"
    
    # Get backend URL for frontend environment variable
    echo -e "${YELLOW}Enter your backend URL (e.g., https://reactjs-quiz-backend.onrender.com):${NC}"
    read -r BACKEND_URL
    
    if [ -z "$BACKEND_URL" ]; then
        BACKEND_URL="https://reactjs-quiz-backend.onrender.com"
        echo -e "${YELLOW}Using default backend URL: $BACKEND_URL${NC}"
    fi
    
    # Create static site
    echo -e "${YELLOW}Creating frontend static site...${NC}"
    render services create static \
        --name "reactjs-quiz-frontend" \
        --repo "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" \
        --branch "main" \
        --build-command "npm install && npm run build" \
        --publish-dir "dist" \
        --plan "free" \
        --env-var "VITE_API_URL=${BACKEND_URL}/api"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend service created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create frontend service${NC}"
        return 1
    fi
}

# Function to update CORS after deployment
update_cors() {
    echo -e "\n${BLUE}🔄 Updating CORS Configuration...${NC}"
    
    echo -e "${YELLOW}Enter your frontend URL (e.g., https://reactjs-quiz-frontend.onrender.com):${NC}"
    read -r FRONTEND_URL
    
    if [ -n "$FRONTEND_URL" ]; then
        echo -e "${YELLOW}Updating backend CORS settings...${NC}"
        render services env set reactjs-quiz-backend FRONTEND_URL="$FRONTEND_URL"
        echo -e "${GREEN}✅ CORS updated with frontend URL${NC}"
    fi
}

# Main deployment flow
main() {
    echo -e "\n${BLUE}Choose deployment option:${NC}"
    echo "1. Deploy Backend only"
    echo "2. Deploy Frontend only" 
    echo "3. Deploy Both (Recommended)"
    echo "4. Update CORS settings"
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            deploy_backend
            ;;
        2)
            deploy_frontend
            ;;
        3)
            deploy_backend
            if [ $? -eq 0 ]; then
                sleep 5  # Wait a moment between deployments
                deploy_frontend
                if [ $? -eq 0 ]; then
                    update_cors
                fi
            fi
            ;;
        4)
            update_cors
            ;;
        *)
            echo -e "${RED}Invalid choice. Exiting.${NC}"
            exit 1
            ;;
    esac
    
    echo -e "\n${GREEN}🎉 Deployment process completed!${NC}"
    echo -e "\n${BLUE}Next steps:${NC}"
    echo "1. Check your services at: https://dashboard.render.com"
    echo "2. Wait for builds to complete (5-10 minutes)"
    echo "3. Test your applications:"
    echo "   - Backend: https://your-backend-name.onrender.com/api/health"
    echo "   - Frontend: https://your-frontend-name.onrender.com"
    echo "4. Update environment variables if needed"
}

# Check if GitHub repo URL needs to be updated
echo -e "\n${YELLOW}⚠️  Important: Update YOUR_USERNAME/YOUR_REPO_NAME in this script${NC}"
echo -e "${YELLOW}Current repo placeholder: YOUR_USERNAME/YOUR_REPO_NAME${NC}"
echo -e "${YELLOW}Enter your GitHub repository URL (username/repo-name):${NC}"
read -r GITHUB_REPO

if [ -n "$GITHUB_REPO" ]; then
    # Update the script with actual repo URL
    sed -i "s|YOUR_USERNAME/YOUR_REPO_NAME|$GITHUB_REPO|g" "$0"
    echo -e "${GREEN}✅ Repository URL updated to: $GITHUB_REPO${NC}"
fi

# Run main function
main
