# Moving Repository to New GitHub Account

## Quick Method (Automated)

Run the migration script:
```bash
./move-to-new-github.sh
```

## Manual Method (Step by Step)

### Step 1: Create New Repository
1. Sign in to your new GitHub account
2. Create new repository: `reactjs-quiz-app`
3. Set as Public (for free Render deployment)
4. Don't initialize with README

### Step 2: Commit Current Changes
```bash
git add .
git commit -m "Add deployment scripts before moving repository"
```

### Step 3: Change Remote Origin
```bash
# Remove current remote
git remote remove origin

# Add new remote (replace NEW_USERNAME with your username)
git remote add origin https://github.com/NEW_USERNAME/reactjs-quiz-app.git

# Verify new remote
git remote -v
```

### Step 4: Push to New Repository
```bash
# Push current branch to new repository
git push -u origin dev

# Or if you want to push to main branch
git branch -M main
git push -u origin main
```

### Step 5: Update Deployment Scripts
Update these files with your new repository URL:
- `github-setup.sh`
- `deploy-to-render.sh` 
- `RENDER_CLI_GUIDE.md`

Replace:
```
YOUR_USERNAME/YOUR_REPO_NAME
```
With:
```
NEW_USERNAME/reactjs-quiz-app
```

### Step 6: Commit Script Updates
```bash
git add .
git commit -m "Update deployment scripts with new repository URL"
git push origin dev
```

## Verification

1. **Check new repository**: Visit https://github.com/NEW_USERNAME/reactjs-quiz-app
2. **Verify files**: Ensure all files including deployment scripts are there
3. **Check remote**: Run `git remote -v` to confirm new origin

## Next Steps After Moving

1. **Deploy to Render** using new repository URL
2. **Update any existing services** in Render dashboard
3. **Share new repository** URL with team/collaborators

## If You Have Existing Render Services

Update them to use the new repository:
```bash
# List current services
render services list

# Update repository URL for existing services
render services update SERVICE_NAME --repo https://github.com/NEW_USERNAME/reactjs-quiz-app.git
```

## Troubleshooting

### Permission Denied
- Ensure you have write access to the new repository
- Check if you're signed in to the correct GitHub account
- Use personal access token if using 2FA

### Repository Not Found
- Verify the repository exists on GitHub
- Check the repository name and username are correct
- Ensure repository is public or you have access

### Authentication Issues
```bash
# Configure Git with new account credentials
git config user.name "Your New Name"
git config user.email "your.new.email@example.com"

# Use personal access token for HTTPS
git remote set-url origin https://USERNAME:TOKEN@github.com/USERNAME/REPO.git
```
