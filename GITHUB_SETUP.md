# GitHub Setup Guide

## Quick Start (After Creating GitHub Repository)

1. **Replace the placeholders** in the commands below with your actual GitHub details
2. **Run these commands** in your terminal:

```bash
# Navigate to your project directory
cd /home/vboxuser/pocs

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## Alternative Method Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create repository and push in one command
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

## Detailed Steps

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "+" → "New repository"
3. **Repository name**: `reactjs-quiz-app` (or your preferred name)
4. **Description**: `ReactJS Proficiency Quiz Application - Full-stack quiz app with admin dashboard`
5. **Visibility**: Public (required for free Render deployment)
6. **Don't check**: "Add a README file" (you already have one)
7. Click "Create repository"

### 2. Connect and Push

After creating the repository, GitHub will show you setup commands. Use these:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Rename branch to main (if not already)
git branch -M main

# Push code to GitHub
git push -u origin main
```

### 3. Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files including:
   - `README.md`
   - `DEPLOYMENT.md`
   - `backend/` folder
   - `src/` folder
   - Configuration files

## Repository Structure on GitHub

Your repository will contain:

```
reactjs-quiz-app/
├── backend/               # Node.js backend
│   ├── src/
│   ├── package.json
│   └── render.yaml
├── src/                   # React frontend
│   ├── components/
│   └── services/
├── public/
├── DEPLOYMENT.md          # Deployment guide
├── README.md             # Project documentation
├── package.json          # Frontend dependencies
└── render.yaml           # Frontend deployment config
```

## Next Steps After GitHub Setup

1. **Verify Repository**: Check that all files are visible on GitHub
2. **Deploy to Render**: Follow the `DEPLOYMENT.md` guide
3. **Update URLs**: After deployment, update any hardcoded URLs
4. **Share**: Your repository will be publicly accessible

## Troubleshooting

### Authentication Issues
If you get authentication errors:

```bash
# Use personal access token instead of password
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Repository Already Exists
If the repository name is taken:
1. Choose a different name like `reactjs-proficiency-quiz`
2. Or add a suffix like `reactjs-quiz-app-2025`

### Permission Denied
Make sure you're the owner of the repository or have push permissions.

## Repository Settings for Render Deployment

After pushing to GitHub:

1. **Go to repository Settings**
2. **Pages section**: Not needed (using Render)
3. **Webhooks**: Render will auto-configure
4. **Deploy keys**: Not needed for public repos

Your repository is now ready for Render deployment! 🚀
