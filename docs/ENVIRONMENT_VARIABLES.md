# Environment Variables

This document explains the environment variables used in the ReactJS Quiz Application.

## Frontend Environment Variables

The frontend uses Vite, so all environment variables must be prefixed with `VITE_`.

### Required Variables

#### `VITE_API_URL`
- **Description**: The base URL for the backend API
- **Development**: `/api` (uses Vite proxy)
- **Production**: `https://reactjs-quiz-backend.onrender.com/api`

#### `VITE_ADMIN_TOKEN`
- **Description**: The authentication token for admin access
- **Default**: `admin_2025_reactjs_quiz`
- **Usage**: Used to authenticate admin users in the AdminDashboard component

## Environment Files

### Development (`.env`)
```bash
VITE_API_URL=/api
VITE_ADMIN_TOKEN=admin_2025_reactjs_quiz
```

### Production (`.env.production`)
```bash
VITE_API_URL=https://reactjs-quiz-backend.onrender.com/api
VITE_ADMIN_TOKEN=admin_2025_reactjs_quiz
```

## Configuration

The environment variables are centralized in `src/config/index.js`:

```javascript
export const config = {
  API_URL: getApiBaseUrl(),
  ADMIN_TOKEN: import.meta.env.VITE_ADMIN_TOKEN || 'admin_2025_reactjs_quiz',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};
```

## Usage

Import the configuration in your components:

```javascript
import config from './config';

// Use the admin token
const adminToken = config.ADMIN_TOKEN;

// Use the API URL
const apiUrl = config.API_URL;
```

## Security Notes

- Environment variables in Vite are bundled into the client-side code
- Don't store truly sensitive secrets in frontend environment variables
- The admin token in this demo app is not a security-critical secret
- In production, consider using proper authentication flows instead of static tokens

## Deployment

### Render Deployment

When deploying to Render, set the environment variables in the Render dashboard:

1. Go to your Render service dashboard
2. Navigate to Environment tab
3. Add the environment variables:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`
   - `VITE_ADMIN_TOKEN=your_admin_token_here`

### Local Development

1. Copy `.env.example` to `.env` if provided
2. Or create `.env` with the required variables
3. Restart the development server after changing environment variables
