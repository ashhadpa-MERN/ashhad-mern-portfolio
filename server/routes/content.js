import express from 'express'
import { authenticate, isAdmin } from '../middlewares/auth.js'
import Hero from '../models/Hero.js'
import About from '../models/About.js'
import Skill from '../models/Skill.js'
import Experience from '../models/Experience.js'
import Project from '../models/Project.js'
import ContactInfo from '../models/ContactInfo.js'

const router = express.Router()

// ============ HERO ROUTES ============
// Get hero content (public)
router.get('/hero', async (req, res) => {
  try {
    const hero = await Hero.getHero()
    res.json({ success: true, data: hero })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update hero content (admin only)
router.put('/hero', authenticate, isAdmin, async (req, res) => {
  try {
    let hero = await Hero.findOne()
    if (!hero) {
      hero = await Hero.create(req.body)
    } else {
      Object.assign(hero, req.body)
      await hero.save()
    }
    res.json({ success: true, data: hero, message: 'Hero content updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ ABOUT ROUTES ============
// Get about content (public)
router.get('/about', async (req, res) => {
  try {
    const about = await About.getAbout()
    res.json({ success: true, data: about })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update about content (admin only)
router.put('/about', authenticate, isAdmin, async (req, res) => {
  try {
    let about = await About.findOne()
    if (!about) {
      about = await About.create(req.body)
    } else {
      Object.assign(about, req.body)
      await about.save()
    }
    res.json({ success: true, data: about, message: 'About content updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ SKILLS ROUTES ============
// Get all skills (public)
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 })
    res.json({ success: true, data: skills })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create skill category (admin only)
router.post('/skills', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json({ success: true, data: skill, message: 'Skill category created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update skill category (admin only)
router.put('/skills/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill category not found' })
    }
    res.json({ success: true, data: skill, message: 'Skill category updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete skill category (admin only)
router.delete('/skills/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill category not found' })
    }
    res.json({ success: true, message: 'Skill category deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ EXPERIENCE ROUTES ============
// Get all experiences (public)
router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: -1, createdAt: -1 })
    res.json({ success: true, data: experiences })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create experience (admin only)
router.post('/experiences', authenticate, isAdmin, async (req, res) => {
  try {
    const experience = await Experience.create(req.body)
    res.status(201).json({ success: true, data: experience, message: 'Experience created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update experience (admin only)
router.put('/experiences/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' })
    }
    res.json({ success: true, data: experience, message: 'Experience updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete experience (admin only)
router.delete('/experiences/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id)
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' })
    }
    res.json({ success: true, message: 'Experience deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ PROJECTS ROUTES ============
// Get all projects (public)
router.get('/projects', async (req, res) => {
  try {
    const { category } = req.query
    const query = category && category !== 'all' ? { category } : {}
    const projects = await Project.find(query).sort({ order: -1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create project (admin only)
router.post('/projects', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update project (admin only)
router.put('/projects/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, data: project, message: 'Project updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Delete project (admin only)
router.delete('/projects/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// ============ CONTACT INFO ROUTES ============
// Get contact info (public)
router.get('/contact-info', async (req, res) => {
  try {
    const contactInfo = await ContactInfo.getContactInfo()
    res.json({ success: true, data: contactInfo })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Update contact info (admin only)
router.put('/contact-info', authenticate, isAdmin, async (req, res) => {
  try {
    let contactInfo = await ContactInfo.findOne()
    if (!contactInfo) {
      contactInfo = await ContactInfo.create(req.body)
    } else {
      Object.assign(contactInfo, req.body)
      await contactInfo.save()
    }
    res.json({ success: true, data: contactInfo, message: 'Contact info updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router


