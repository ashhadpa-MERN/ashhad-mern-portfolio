import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'Ash Had P A'
    },
    email: {
      type: String,
      required: true,
      default: 'ashaad.pa@gmail.com'
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'tutorial', 'tips', 'project', 'general'],
    default: 'general'
  },
  featuredImage: {
    url: String,
    alt: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number,
    default: 0 // in minutes
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
})

// Indexes for better query performance
blogSchema.index({ status: 1, publishedAt: -1 })
blogSchema.index({ tags: 1 })
blogSchema.index({ category: 1 })
blogSchema.index({ 'author.name': 1 })

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }
  next()
})

// Pre-save middleware to calculate read time
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(/\s+/).length
    this.readTime = Math.ceil(wordCount / wordsPerMinute)
  }
  next()
})

// Virtual for formatted published date
blogSchema.virtual('formattedPublishedDate').get(function() {
  if (!this.publishedAt) return null
  return this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Virtual for URL
blogSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`
})

// Ensure virtual fields are serialized
blogSchema.set('toJSON', { virtuals: true })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
