#!/bin/bash

# GitHub Re-authentication Script
echo "🔐 GitHub Re-authentication Setup"
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up Git authentication for new GitHub account...${NC}"

# Get new GitHub account details
echo -e "${YELLOW}Enter your NEW GitHub username:${NC}"
read -r NEW_USERNAME

echo -e "${YELLOW}Enter your NEW GitHub email:${NC}"
read -r NEW_EMAIL

echo -e "${YELLOW}Enter your NEW repository name (or press enter for 'reactjs-quiz-app'):${NC}"
read -r NEW_REPO_NAME
if [ -z "$NEW_REPO_NAME" ]; then
    NEW_REPO_NAME="reactjs-quiz-app"
fi

# Configure Git globally
echo -e "\n${BLUE}Step 1: Configuring Git credentials...${NC}"
git config --global user.name "$NEW_USERNAME"
git config --global user.email "$NEW_EMAIL"

# Clear any existing credentials
echo -e "\n${BLUE}Step 2: Clearing old credentials...${NC}"
git config --global --unset credential.helper 2>/dev/null || true

# Configure credential helper
echo -e "\n${BLUE}Step 3: Setting up credential helper...${NC}"
git config --global credential.helper store

echo -e "\n${GREEN}✅ Git credentials configured${NC}"
echo -e "Username: $NEW_USERNAME"
echo -e "Email: $NEW_EMAIL"

# Test connection
echo -e "\n${BLUE}Step 4: Testing GitHub connection...${NC}"
echo -e "${YELLOW}You'll need to enter your GitHub username and Personal Access Token${NC}"
echo -e "${YELLOW}(NOT your password - GitHub requires Personal Access Tokens)${NC}"

# Remove old remote and add new one
echo -e "\n${BLUE}Step 5: Updating repository remote...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$NEW_USERNAME/$NEW_REPO_NAME.git"

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo -e "1. Create repository on GitHub: https://github.com/$NEW_USERNAME/$NEW_REPO_NAME"
echo -e "2. Generate Personal Access Token (if you don't have one):"
echo -e "   - Go to: GitHub Settings > Developer settings > Personal access tokens"
echo -e "   - Generate new token with 'repo' permissions"
echo -e "3. Run: git push -u origin dev"
echo -e "   - Use your GitHub username and Personal Access Token when prompted"

echo -e "\n${YELLOW}Personal Access Token Instructions:${NC}"
echo -e "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
