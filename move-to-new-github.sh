#!/bin/bash

# Script to Move Repository to New GitHub Account
# Usage: ./move-to-new-github.sh NEW_USERNAME NEW_REPO_NAME

echo "🔄 Moving ReactJS Quiz App to New GitHub Account"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get new GitHub details
if [ -z "$1" ] || [ -z "$2" ]; then
    echo -e "${YELLOW}Enter your new GitHub username:${NC}"
    read -r NEW_USERNAME
    echo -e "${YELLOW}Enter your new repository name (or press enter for 'reactjs-quiz-app'):${NC}"
    read -r NEW_REPO_NAME
    
    if [ -z "$NEW_REPO_NAME" ]; then
        NEW_REPO_NAME="reactjs-quiz-app"
    fi
else
    NEW_USERNAME="$1"
    NEW_REPO_NAME="$2"
fi

echo -e "${BLUE}New repository will be: https://github.com/$NEW_USERNAME/$NEW_REPO_NAME${NC}"
echo -e "${YELLOW}Is this correct? (y/n):${NC}"
read -r confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo -e "${RED}Cancelled.${NC}"
    exit 1
fi

# Step 1: Add and commit any pending changes
echo -e "\n${BLUE}Step 1: Committing pending changes...${NC}"
git add .
git commit -m "Add deployment scripts and documentation before moving to new repository"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Changes committed${NC}"
else
    echo -e "${YELLOW}⚠️  No changes to commit or commit failed${NC}"
fi

# Step 2: Remove old remote
echo -e "\n${BLUE}Step 2: Removing old remote origin...${NC}"
git remote remove origin

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Old remote removed${NC}"
else
    echo -e "${RED}❌ Failed to remove old remote${NC}"
fi

# Step 3: Add new remote
echo -e "\n${BLUE}Step 3: Adding new remote origin...${NC}"
git remote add origin "https://github.com/$NEW_USERNAME/$NEW_REPO_NAME.git"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ New remote added${NC}"
else
    echo -e "${RED}❌ Failed to add new remote${NC}"
    exit 1
fi

# Step 4: Push to new repository
echo -e "\n${BLUE}Step 4: Pushing to new repository...${NC}"
echo -e "${YELLOW}Pushing to branch 'dev'...${NC}"

git push -u origin dev

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Code pushed to new repository successfully!${NC}"
else
    echo -e "${RED}❌ Failed to push to new repository${NC}"
    echo -e "${YELLOW}This might be because:${NC}"
    echo -e "${YELLOW}1. Repository doesn't exist on GitHub${NC}"
    echo -e "${YELLOW}2. You don't have push permissions${NC}"
    echo -e "${YELLOW}3. Authentication failed${NC}"
    exit 1
fi

# Step 5: Update deployment scripts
echo -e "\n${BLUE}Step 5: Updating deployment scripts...${NC}"

# Update github-setup.sh
if [ -f "github-setup.sh" ]; then
    sed -i "s|https://github.com/.*/.*\.git|https://github.com/$NEW_USERNAME/$NEW_REPO_NAME.git|g" github-setup.sh
    echo -e "${GREEN}✅ Updated github-setup.sh${NC}"
fi

# Update deploy-to-render.sh
if [ -f "deploy-to-render.sh" ]; then
    sed -i "s|YOUR_USERNAME/YOUR_REPO_NAME|$NEW_USERNAME/$NEW_REPO_NAME|g" deploy-to-render.sh
    echo -e "${GREEN}✅ Updated deploy-to-render.sh${NC}"
fi

# Update RENDER_CLI_GUIDE.md
if [ -f "RENDER_CLI_GUIDE.md" ]; then
    sed -i "s|YOUR_USERNAME/YOUR_REPO_NAME|$NEW_USERNAME/$NEW_REPO_NAME|g" RENDER_CLI_GUIDE.md
    echo -e "${GREEN}✅ Updated RENDER_CLI_GUIDE.md${NC}"
fi

# Commit the script updates
git add .
git commit -m "Update deployment scripts with new repository URL"
git push origin dev

echo -e "\n${GREEN}🎉 Repository successfully moved!${NC}"
echo -e "\n${BLUE}Summary:${NC}"
echo -e "Old repository: A8S1SZZ_mmm/reactjs-quiz-app"
echo -e "New repository: $NEW_USERNAME/$NEW_REPO_NAME"
echo -e "Branch: dev"
echo -e "\n${BLUE}Next steps:${NC}"
echo -e "1. Visit: https://github.com/$NEW_USERNAME/$NEW_REPO_NAME"
echo -e "2. Verify all files are there"
echo -e "3. Deploy to Render using the new repository"
echo -e "4. Update any existing Render services with the new repository URL"

echo -e "\n${BLUE}Render Deployment Commands:${NC}"
echo -e "render login"
echo -e "./deploy-to-render.sh"
