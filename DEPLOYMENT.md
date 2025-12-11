# Deployment Guide

This guide will help you deploy the Ash Had P A portfolio website to Vercel.

## 🚀 Quick Deployment

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ashhadpa/portfolio)

### Option 2: Manual Deployment

1. **Fork the Repository**
   ```bash
   git clone https://github.com/ashhadpa/portfolio.git
   cd portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up Environment Variables**
   - Copy `server/env.example` to `server/.env`
   - Fill in your environment variables

4. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

## 🔧 Environment Variables

Set these environment variables in your Vercel dashboard:

### Required Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Redis
REDIS_URL=redis://username:password@host:port

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key
```

### Optional Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Client URL
CLIENT_URL=https://your-domain.vercel.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 📊 Database Setup

### MongoDB Atlas

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create Cluster**
   - Click "Create Cluster"
   - Choose the free tier
   - Select a region close to your users

3. **Configure Access**
   - Go to "Database Access"
   - Add a new database user
   - Set username and password

4. **Whitelist IPs**
   - Go to "Network Access"
   - Add IP address (0.0.0.0/0 for all IPs)

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

### Redis Cloud

1. **Create Account**
   - Go to [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
   - Create a free account

2. **Create Database**
   - Click "Create Database"
   - Choose the free tier
   - Select a region

3. **Get Connection URL**
   - Go to your database
   - Copy the connection URL

## 📧 Email Setup

### Gmail Setup

1. **Enable 2FA**
   - Go to your Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Security settings
   - Click "App passwords"
   - Generate a new app password for "Mail"

3. **Use App Password**
   - Use the generated password in `EMAIL_PASS`
   - Use your Gmail address in `EMAIL_USER` and `EMAIL_FROM`

### Other Email Providers

For other email providers, update these settings in your `.env`:

```env
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-password
EMAIL_FROM=your-email@domain.com
```

## 🌐 Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Configure DNS**
   - Add a CNAME record pointing to your Vercel domain
   - Wait for DNS propagation

3. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Your site will be available at `https://yourdomain.com`

## 🔍 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to your project settings
   - Enable Vercel Analytics

2. **View Metrics**
   - Monitor page views, performance, and errors
   - Track Core Web Vitals

### Custom Monitoring

Add these services for advanced monitoring:

- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Hotjar** - User behavior tracking

## 🚀 Performance Optimization

### Frontend Optimization

1. **Image Optimization**
   - Use WebP format for images
   - Implement lazy loading
   - Use Vercel's image optimization

2. **Code Splitting**
   - Already implemented with React.lazy()
   - Route-based code splitting

3. **Caching**
   - Static assets cached by Vercel CDN
   - API responses cached with Redis

### Backend Optimization

1. **Database Indexing**
   - Indexes already created for common queries
   - Monitor query performance

2. **Caching Strategy**
   - Redis caching for blog posts
   - Cache invalidation on updates

3. **Rate Limiting**
   - Prevents abuse and improves performance
   - Configurable limits per endpoint

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Input validation implemented
- [ ] Error handling in place
- [ ] HTTPS enabled
- [ ] Security headers configured

## 📱 Testing

### Local Testing

```bash
# Start development servers
npm run dev

# Test frontend
curl http://localhost:3000

# Test backend
curl http://localhost:5000/api/health
```

### Production Testing

```bash
# Test deployed frontend
curl https://your-domain.vercel.app

# Test deployed backend
curl https://your-domain.vercel.app/api/health
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify MongoDB URI format
   - Check IP whitelist settings
   - Ensure database user has proper permissions

3. **Email Not Working**
   - Verify email credentials
   - Check if 2FA is enabled
   - Use app password instead of regular password

4. **Redis Connection Issues**
   - Verify Redis URL format
   - Check if Redis instance is running
   - Verify network access

### Debug Mode

Enable debug mode by setting:

```env
NODE_ENV=development
DEBUG=true
```

## 📞 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/ashhadpa/portfolio/issues)
2. Create a new issue with detailed information
3. Contact: ashaad.pa@gmail.com

## 🎉 Success!

Once deployed, your portfolio will be available at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api`

Remember to:
- Test all functionality
- Update your resume with the new URL
- Share your portfolio on social media
- Monitor performance and user feedback

---

Happy deploying! 🚀
