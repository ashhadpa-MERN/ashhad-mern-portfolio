# Vercel Deployment Guide

This guide will help you deploy your MERN Stack Portfolio to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub repository connected to Vercel
3. MongoDB Atlas database (or your MongoDB connection string)
4. Environment variables configured

## Deployment Steps

### 1. Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository: `ashhadpa-MERN/ashhad-mern-portfolio`
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as default (root)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install && cd client && npm install && cd ../server && npm install`

### 3. Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://ashaadpa_db_user:qQ2xLr9otSBw6zAe@cluster0.jhvsy15.mongodb.net/portfolioDB?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
PORT=5001
```

**Important**: Replace `your-super-secret-jwt-key-change-this` with a strong random string.

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Project Structure

```
myportfolio/
├── api/
│   └── index.js          # Vercel serverless function wrapper
├── client/               # React frontend
│   ├── dist/            # Build output (generated)
│   └── src/
├── server/              # Express backend
│   ├── routes/
│   ├── models/
│   └── index.js
└── vercel.json          # Vercel configuration
```

## How It Works

1. **Frontend**: Built as a static site from `client/dist`
2. **Backend**: Runs as serverless functions via `api/index.js`
3. **API Routes**: All `/api/*` requests are routed to the Express server
4. **Static Files**: All other routes serve the React app

## Troubleshooting

### Build Fails

- Check that all dependencies are installed
- Verify build command is correct
- Check Vercel build logs for specific errors

### API Not Working

- Verify environment variables are set correctly
- Check MongoDB connection string
- Ensure CORS is configured for your Vercel domain

### Database Connection Issues

- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB connection string format
- Ensure database user has proper permissions

## Post-Deployment

1. Test all API endpoints
2. Verify admin login works
3. Test content updates
4. Check that MongoDB connection is working

## Custom Domain

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Update `CLIENT_URL` environment variable
4. Update MongoDB Atlas network access if needed

