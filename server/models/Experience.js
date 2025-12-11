import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  companyUrl: {
    type: String,
    default: '#'
  },
  location: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  description: {
    type: String,
    required: true
  },
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  current: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

experienceSchema.index({ order: 1 })

const Experience = mongoose.model('Experience', experienceSchema)

export default Experience


