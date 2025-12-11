# Ash Had P A - Portfolio Website

A modern, responsive MERN stack portfolio website showcasing my skills, projects, and experience as a full-stack developer.

## 🚀 Live Demo

- **Frontend**: [https://ashhadpa.dev](https://ashhadpa.dev)
- **Backend API**: [https://api.ashhadpa.dev](https://api.ashhadpa.dev)

## ✨ Features

### Frontend
- **Modern Design**: Clean, professional UI with dark/light theme toggle
- **Responsive**: Fully responsive design for all devices
- **Animations**: Smooth animations using Framer Motion and GSAP
- **Performance**: Optimized with lazy loading and code splitting
- **SEO**: Meta tags and structured data for better search visibility

### Backend
- **RESTful API**: Well-structured API endpoints
- **Email Integration**: Contact form with Nodemailer
- **Caching**: Redis caching for improved performance
- **Rate Limiting**: Protection against spam and abuse
- **Error Handling**: Comprehensive error handling and logging

### Sections
- **Hero**: Animated introduction with call-to-action
- **About**: Personal information and statistics
- **Skills**: Categorized technical skills with progress indicators
- **Experience**: Timeline of professional experience
- **Projects**: Interactive project showcase with filtering
- **Contact**: Working contact form with validation
- **Blog**: Dynamic blog system (optional)

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Redis** - In-memory data store
- **Nodemailer** - Email service
- **JWT** - Authentication tokens
- **Helmet** - Security middleware

### Deployment
- **Vercel** - Frontend and backend hosting
- **MongoDB Atlas** - Cloud database
- **Redis Cloud** - Cloud caching

## 📁 Project Structure

```
myportfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── services/          # Business logic
│   ├── middlewares/       # Custom middlewares
│   └── index.js
├── package.json           # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Redis (local or Cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashhadpa/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp server/env.example server/.env
   
   # Edit server/.env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Redis
REDIS_URL=redis://localhost:6379

# Client URL
CLIENT_URL=http://localhost:3000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key
```

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm start` - Start production server
- `npm run install-all` - Install all dependencies

### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (server/)
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Configure environment variables

2. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   MONGODB_URI=your-mongodb-atlas-uri
   REDIS_URL=your-redis-cloud-url
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   JWT_SECRET=your-jwt-secret
   ```

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Frontend and backend will be deployed separately

### Manual Deployment

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy Backend**
   ```bash
   cd server
   npm start
   ```

## 🔧 Configuration

### Email Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS` environment variable

### Database Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in your environment variables

### Redis Setup
1. Create a Redis Cloud account
2. Create a new database
3. Get the connection URL
4. Update `REDIS_URL` in your environment variables

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent
- **Bundle Size**: Optimized with code splitting
- **Caching**: Redis caching for API responses
- **CDN**: Vercel's global CDN

## 🔒 Security

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Server-side validation
- **CORS**: Configured for production
- **Helmet**: Security headers
- **Environment Variables**: Sensitive data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: ashaad.pa@gmail.com
- **LinkedIn**: [linkedin.com/in/ashhad-36L00009](https://linkedin.com/in/ashhad-36L00009)
- **GitHub**: [github.com/ashhadpa](https://github.com/ashhadpa)
- **Portfolio**: [ashhadpa.dev](https://ashhadpa.dev)

## 🙏 Acknowledgments

- Design inspiration from various portfolio websites
- Icons from React Icons
- Fonts from Google Fonts
- Hosting by Vercel
- Database by MongoDB Atlas
- Caching by Redis Cloud

---

Made with ❤️ by [Ash Had P A](https://ashhadpa.dev)
