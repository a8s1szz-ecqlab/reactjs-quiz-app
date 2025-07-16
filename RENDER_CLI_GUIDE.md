# Render CLI Deployment Guide

## Step 1: Complete Render Login

You need to complete the Render login process first:

1. **Visit the authentication URL**:
   ```
   https://dashboard.render.com/device-authorization/LH3N-VSK6-VS4Q-RS6M
   ```
   
2. **Or run the login command again**:
   ```bash
   render login
   ```
   
3. **Follow the browser instructions** to authenticate

4. **Verify login**:
   ```bash
   render whoami
   ```

## Step 2: Deploy Backend Service

Once authenticated, run these commands:

```bash
# Deploy backend web service
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
```

## Step 3: Deploy Frontend Service

```bash
# Deploy frontend static site
render services create static \
  --name "reactjs-quiz-frontend" \
  --repo "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" \
  --branch "main" \
  --build-command "npm install && npm run build" \
  --publish-dir "dist" \
  --plan "free" \
  --env-var "VITE_API_URL=https://reactjs-quiz-backend.onrender.com/api"
```

## Step 4: Update CORS Settings

After both services are deployed:

```bash
# Update backend with frontend URL
render services env set reactjs-quiz-backend \
  FRONTEND_URL="https://reactjs-quiz-frontend.onrender.com"
```

## Alternative: Use the Deployment Script

Run the interactive deployment script:

```bash
./deploy-to-render.sh
```

## Manual Commands Reference

### List Services
```bash
render services list
```

### View Service Details
```bash
render services show reactjs-quiz-backend
render services show reactjs-quiz-frontend
```

### View Logs
```bash
render logs -s reactjs-quiz-backend
render logs -s reactjs-quiz-frontend
```

### Update Environment Variables
```bash
render services env set SERVICE_NAME KEY=VALUE
```

### Trigger Manual Deploy
```bash
render services deploy reactjs-quiz-backend
render services deploy reactjs-quiz-frontend
```

## Important Notes

1. **Replace placeholders**: Update `YOUR_USERNAME/YOUR_REPO_NAME` with your actual GitHub repository
2. **Service names**: Ensure service names are unique in your account
3. **Free tier**: Services will sleep after 15 minutes of inactivity
4. **Build time**: Initial deployment takes 5-10 minutes
5. **URLs**: Note the generated URLs for both services

## Verification Steps

1. **Backend Health Check**:
   ```bash
   curl https://reactjs-quiz-backend.onrender.com/api/health
   ```

2. **Frontend Access**:
   Visit `https://reactjs-quiz-frontend.onrender.com`

3. **Check Service Status**:
   ```bash
   render services list
   ```

## Troubleshooting

### Authentication Issues
```bash
render login
render whoami
```

### Service Creation Errors
- Check repository URL is correct
- Ensure branch exists
- Verify build commands are valid

### Build Failures
```bash
render logs -s SERVICE_NAME
```

### Environment Variable Issues
```bash
render services env list SERVICE_NAME
render services env set SERVICE_NAME KEY=VALUE
```
