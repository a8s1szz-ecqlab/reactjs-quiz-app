# Render Deployment Guide

This guide will help you deploy both the frontend and backend of the ReactJS Quiz Application to Render for free.

## Prerequisites

1. Create a free account at [render.com](https://render.com)
2. Connect your GitHub repository to Render
3. Have your code pushed to a GitHub repository

## Backend Deployment

### Step 1: Deploy Backend Service

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `reactjs-quiz-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 2: Set Environment Variables

In the Environment section, add:
- `NODE_ENV` = `production`
- `DATA_DIR` = `/opt/render/project/src/data`

### Step 3: Configure Health Check

- **Health Check Path**: `/api/health`

## Frontend Deployment

### Step 1: Deploy Frontend Service

1. In your Render dashboard, click "New +" and select "Static Site"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `reactjs-quiz-frontend`
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 2: Set Environment Variables

In the Environment section, add:
- `VITE_API_URL` = `https://reactjs-quiz-backend.onrender.com/api`

**Important**: Replace `reactjs-quiz-backend` with your actual backend service name from Step 1 if different.

## Post-Deployment Configuration

### Update CORS Settings

After both services are deployed, you'll need to update the backend CORS settings:

1. Get your frontend URL (e.g., `https://reactjs-quiz-frontend.onrender.com`)
2. In the backend environment variables, add:
   - `FRONTEND_URL` = `https://your-frontend-url.onrender.com`

### Update Frontend API URL

If your backend URL is different from the default, update the frontend environment variable:
- `VITE_API_URL` = `https://your-actual-backend-url.onrender.com/api`

## Important Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours per month limit per service

### Database Persistence
- The LowDB JSON file will persist between deployments
- Data is stored in the `/opt/render/project/src/data` directory
- Backup important data regularly as free tier doesn't guarantee data persistence

### Cold Starts
- First load might be slow due to service spin-up
- Consider using a simple uptime monitor to keep services warm if needed

## Testing Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-url.onrender.com/api/health`
2. **Frontend**: Visit `https://your-frontend-url.onrender.com`
3. **Full Integration**: Try creating a student profile and taking a quiz

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure FRONTEND_URL environment variable is set correctly in backend
2. **API Connection Issues**: Verify VITE_API_URL in frontend environment variables
3. **Database Issues**: Check backend logs for database initialization errors
4. **Build Failures**: Check build logs in Render dashboard

### Logs Access

- Backend logs: Available in Render dashboard under your web service
- Frontend logs: Available during build process in Render dashboard

## Auto-Deploy

Both services will automatically redeploy when you push changes to your connected GitHub repository branch.

## Scaling

If you need better performance, you can upgrade to paid plans for:
- Faster cold starts
- Always-on services
- Better resource allocation
- Priority support
