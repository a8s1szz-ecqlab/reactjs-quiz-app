# Deployment Checklist for Render

## Pre-Deployment ✅

- [x] Updated backend server to listen on 0.0.0.0
- [x] Added NODE_ENV support in CORS configuration  
- [x] Updated database path for production environment
- [x] Added health check endpoint with environment info
- [x] Updated frontend API service for production URLs
- [x] Created render.yaml files for both services
- [x] Added environment variable configuration
- [x] Created deployment documentation
- [x] Added _redirects file for React Router support
- [x] Updated package.json with deployment scripts
- [x] Added Node.js engine specification

## Backend Deployment Steps

1. **Create Web Service on Render**
   - Type: Web Service
   - Environment: Node
   - Plan: Free
   - Root Directory: `backend`

2. **Configure Build & Start**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   DATA_DIR=/opt/render/project/src/data
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

4. **Configure Health Check**
   - Health Check Path: `/api/health`

## Frontend Deployment Steps

1. **Create Static Site on Render**
   - Type: Static Site
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

## Post-Deployment Verification

### Backend Tests
- [ ] Health check: `https://your-backend-url.onrender.com/api/health`
- [ ] API endpoints responding correctly
- [ ] Database initialization working
- [ ] CORS configured properly

### Frontend Tests  
- [ ] Site loads: `https://your-frontend-url.onrender.com`
- [ ] API connection working
- [ ] Admin login functional
- [ ] Student registration working
- [ ] Quiz taking flow complete

### Integration Tests
- [ ] End-to-end quiz submission
- [ ] Admin dashboard data display
- [ ] Student profile functionality
- [ ] Cross-origin requests working

## Configuration Updates

After both services are deployed, update these configurations:

### Backend Environment Variables
- `FRONTEND_URL`: Update with actual frontend URL

### Frontend Environment Variables  
- `VITE_API_URL`: Update with actual backend URL

## Monitoring

### Important URLs to Monitor
- Backend Health: `https://your-backend-url.onrender.com/api/health`
- Frontend: `https://your-frontend-url.onrender.com`

### Expected Response Times
- First load (cold start): 30-60 seconds
- Subsequent loads: 1-5 seconds

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- 750 hours per month per service
- No guaranteed data persistence

## Troubleshooting Common Issues

### CORS Errors
- Verify `FRONTEND_URL` environment variable
- Check allowed origins in backend CORS configuration

### API Connection Issues
- Confirm `VITE_API_URL` environment variable
- Test backend health endpoint directly

### Database Issues
- Check backend logs for database initialization errors
- Verify `DATA_DIR` environment variable

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs in Render dashboard

## Backup Strategy

### Database Backup
Since free tier doesn't guarantee data persistence:
1. Regularly export quiz data via admin dashboard
2. Consider implementing automatic backup to external service
3. Document data recovery procedures

### Code Backup
- Ensure all code is committed to version control
- Tag releases for easy rollback
- Maintain deployment configuration in repository
