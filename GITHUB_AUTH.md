# GitHub Re-Authentication Guide

## Quick Setup (Automated)

Run the re-authentication script:
```bash
./github-reauth.sh
```

## Manual Methods

### Method 1: Configure Git Credentials

```bash
# Set your new GitHub username and email
git config --global user.name "YOUR_NEW_USERNAME"
git config --global user.email "your.new.email@example.com"

# Clear old credentials
git config --global --unset credential.helper

# Set credential helper to store credentials
git config --global credential.helper store
```

### Method 2: Use Personal Access Token (Recommended)

1. **Create Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` permissions
   - Copy the token (you won't see it again!)

2. **Update remote URL with token**:
   ```bash
   git remote set-url origin https://USERNAME:TOKEN@github.com/USERNAME/REPO.git
   ```

### Method 3: SSH Authentication (Most Secure)

1. **Generate SSH key**:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   ```

2. **Add SSH key to GitHub**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy output and add to GitHub Settings → SSH Keys
   ```

3. **Update remote to use SSH**:
   ```bash
   git remote set-url origin git@github.com:USERNAME/REPO.git
   ```

## Step-by-Step Migration Process

### Step 1: Re-authenticate
Choose one of the methods above to set up authentication.

### Step 2: Test Authentication
```bash
# Test with a simple command
git ls-remote origin
```

### Step 3: Update Repository Remote
```bash
# Remove old remote
git remote remove origin

# Add new remote (replace with your details)
git remote add origin https://github.com/NEW_USERNAME/NEW_REPO_NAME.git
```

### Step 4: Push to New Repository
```bash
# Commit any pending changes
git add .
git commit -m "Prepare for repository migration"

# Push to new repository
git push -u origin dev
```

## Troubleshooting Authentication Issues

### Error: "remote: Repository not found"
- Repository doesn't exist on GitHub
- Wrong username/repository name
- No access permissions

**Solution**: Create the repository on GitHub first

### Error: "Authentication failed"
- Wrong username/password
- Need Personal Access Token instead of password
- Expired token

**Solution**: Use Personal Access Token

### Error: "Permission denied"
- SSH key not added to GitHub
- Wrong SSH key permissions

**Solution**: Add SSH key to GitHub account

## Testing Your Setup

### Test 1: Check Git Config
```bash
git config --list | grep user
```

### Test 2: Test Remote Connection
```bash
git ls-remote origin
```

### Test 3: Test Push
```bash
git push origin dev
```

## Personal Access Token Steps

1. **Go to GitHub Settings**:
   - Click your profile → Settings
   - Developer settings → Personal access tokens
   - Tokens (classic) → Generate new token

2. **Configure Token**:
   - Note: "ReactJS Quiz App Access"
   - Expiration: 90 days (or as needed)
   - Scopes: Check `repo` (full repository access)

3. **Copy Token**: Save it securely (you won't see it again)

4. **Use Token**: Use as password when Git prompts for authentication

## Alternative: GitHub CLI

If you have GitHub CLI installed:
```bash
# Login with GitHub CLI
gh auth login

# Clone/push using GitHub CLI
gh repo create NEW_USERNAME/reactjs-quiz-app --public
git push origin dev
```

## Security Best Practices

1. **Use Personal Access Tokens**, not passwords
2. **Set token expiration** appropriately
3. **Use minimal permissions** required
4. **Store tokens securely** (password manager)
5. **Revoke old tokens** when no longer needed

## After Successful Authentication

1. **Verify repository**: Visit https://github.com/NEW_USERNAME/NEW_REPO_NAME
2. **Run migration script**: `./move-to-new-github.sh`
3. **Deploy to Render**: `./deploy-to-render.sh`
