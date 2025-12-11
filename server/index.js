import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import redis from 'redis'
import contactRoutes from './routes/contact.js'
import blogRoutes from './routes/blog.js'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import { errorHandler } from './middlewares/errorHandler.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(limiter)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err))

// Redis connection (optional for development)
let redisClient = null
if (process.env.REDIS_URL && process.env.REDIS_URL !== 'redis://localhost:6379') {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL
    })

    redisClient.on('error', (err) => {
      console.log('⚠️  Redis connection failed - continuing without cache')
      redisClient = null
    })
    redisClient.on('connect', () => console.log('✅ Redis connected successfully'))

    redisClient.connect().catch(() => {
      console.log('⚠️  Redis not available - caching disabled')
      redisClient = null
    })
  } catch (error) {
    console.log('⚠️  Redis not configured - caching disabled')
    redisClient = null
  }
} else {
  console.log('⚠️  Redis not configured - caching disabled (optional)')
}

// Make Redis client available to routes
app.locals.redis = redisClient

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  })
})

// Error handling middleware
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  if (redisClient) redisClient.quit().catch(() => {})
  mongoose.connection.close()
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  if (redisClient) redisClient.quit().catch(() => {})
  mongoose.connection.close()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})
