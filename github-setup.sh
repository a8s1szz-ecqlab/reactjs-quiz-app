#!/bin/bash

# GitHub Setup Script for ReactJS Quiz App
# Replace YOUR_USERNAME and YOUR_REPO_NAME with actual values

echo "🚀 Setting up GitHub repository..."

# Add the GitHub remote repository
git remote add origin https://github.com/a8s1szz-ecqlab/reactjs-quiz-app.git

# Set the upstream branch and push
git branch -M dev
git push -u origin dev

echo "✅ Repository pushed to GitHub successfully!"
echo "📝 Next steps:"
echo "1. Visit your GitHub repository to verify the upload"
echo "2. Follow the deployment guide in DEPLOYMENT.md"
echo "3. Deploy to Render using your GitHub repository"
