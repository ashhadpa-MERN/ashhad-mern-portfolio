import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Ash Had P A'
  },
  title: {
    type: String,
    required: true,
    default: 'MERN Stack Developer'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Building amazing web experiences with React, Node.js, and MongoDB'
  },
  description: {
    type: String,
    required: true,
    default: 'Passionate about creating scalable, performant, and user-friendly applications.'
  },
  company: {
    type: String,
    default: 'WX Digital Agency'
  },
  companyUrl: {
    type: String,
    default: 'https://www.wx.agency/'
  },
  experience: {
    type: String,
    default: '3+ years of experience in full-stack development'
  },
  socialLinks: [{
    name: String,
    icon: String,
    url: String,
    color: String
  }],
  profileImage: {
    type: String,
    default: ''
  },
  initials: {
    type: String,
    default: 'AH'
  }
}, {
  timestamps: true
})

// Ensure only one hero document exists
heroSchema.statics.getHero = async function() {
  let hero = await this.findOne()
  if (!hero) {
    hero = await this.create({})
  }
  return hero
}

const Hero = mongoose.model('Hero', heroSchema)

export default Hero


