import express from 'express'
import Blog from '../models/Blog.js'
import { getCachedData, setCachedData } from '../services/cacheService.js'

const router = express.Router()

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query
    const cacheKey = `blog:list:${page}:${limit}:${category || 'all'}:${tag || 'all'}:${search || 'none'}`

    // Try to get from cache first
    const cachedData = await getCachedData(cacheKey)
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      })
    }

    // Build query
    const query = { status: 'published' }
    
    if (category) {
      query.category = category
    }
    
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    const posts = await Blog.find(query)
      .select('-content') // Exclude full content for list view
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Blog.countDocuments(query)

    const result = {
      posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }

    // Cache the result for 10 minutes
    await setCachedData(cacheKey, result, 600)

    res.json({
      success: true,
      data: result,
      cached: false
    })

  } catch (error) {
    console.error('Get blog posts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    })
  }
})

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const cacheKey = `blog:post:${slug}`

    // Try to get from cache first
    const cachedPost = await getCachedData(cacheKey)
    if (cachedPost) {
      // Increment view count
      await Blog.findByIdAndUpdate(cachedPost._id, { $inc: { views: 1 } })
      
      return res.json({
        success: true,
        data: cachedPost,
        cached: true
      })
    }

    const post = await Blog.findOne({ 
      slug, 
      status: 'published' 
    })

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    // Increment view count
    post.views += 1
    await post.save()

    // Cache the post for 1 hour
    await setCachedData(cacheKey, post, 3600)

    res.json({
      success: true,
      data: post,
      cached: false
    })

  } catch (error) {
    console.error('Get blog post error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    })
  }
})

// Get blog categories
router.get('/meta/categories', async (req, res) => {
  try {
    const cacheKey = 'blog:categories'

    const cachedCategories = await getCachedData(cacheKey)
    if (cachedCategories) {
      return res.json({
        success: true,
        data: cachedCategories,
        cached: true
      })
    }

    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Cache for 1 hour
    await setCachedData(cacheKey, categories, 3600)

    res.json({
      success: true,
      data: categories,
      cached: false
    })

  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    })
  }
})

// Get blog tags
router.get('/meta/tags', async (req, res) => {
  try {
    const cacheKey = 'blog:tags'

    const cachedTags = await getCachedData(cacheKey)
    if (cachedTags) {
      return res.json({
        success: true,
        data: cachedTags,
        cached: true
      })
    }

    const tags = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Cache for 1 hour
    await setCachedData(cacheKey, tags, 3600)

    res.json({
      success: true,
      data: tags,
      cached: false
    })

  } catch (error) {
    console.error('Get tags error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags'
    })
  }
})

// Get featured posts
router.get('/meta/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query
    const cacheKey = `blog:featured:${limit}`

    const cachedFeatured = await getCachedData(cacheKey)
    if (cachedFeatured) {
      return res.json({
        success: true,
        data: cachedFeatured,
        cached: true
      })
    }

    const featuredPosts = await Blog.find({ 
      status: 'published',
      views: { $gte: 10 } // Posts with at least 10 views
    })
      .select('-content')
      .sort({ views: -1, publishedAt: -1 })
      .limit(parseInt(limit))

    // Cache for 30 minutes
    await setCachedData(cacheKey, featuredPosts, 1800)

    res.json({
      success: true,
      data: featuredPosts,
      cached: false
    })

  } catch (error) {
    console.error('Get featured posts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured posts'
    })
  }
})

// Search blog posts
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params
    const { page = 1, limit = 10 } = req.query
    const cacheKey = `blog:search:${query}:${page}:${limit}`

    const cachedResults = await getCachedData(cacheKey)
    if (cachedResults) {
      return res.json({
        success: true,
        data: cachedResults,
        cached: true
      })
    }

    const searchQuery = {
      status: 'published',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }

    const posts = await Blog.find(searchQuery)
      .select('-content')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Blog.countDocuments(searchQuery)

    const result = {
      posts,
      query,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    }

    // Cache for 5 minutes
    await setCachedData(cacheKey, result, 300)

    res.json({
      success: true,
      data: result,
      cached: false
    })

  } catch (error) {
    console.error('Search blog posts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to search blog posts'
    })
  }
})

export default router
