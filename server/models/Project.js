import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '/api/placeholder/600/400'
  },
  liveUrl: {
    type: String,
    default: '#'
  },
  githubUrl: {
    type: String,
    default: '#'
  },
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'backend'],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  technologies: [{
    type: String
  }],
  features: [{
    type: String
  }],
  stats: {
    type: Map,
    of: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

projectSchema.index({ order: 1 })
projectSchema.index({ category: 1 })

const Project = mongoose.model('Project', projectSchema)

export default Project


