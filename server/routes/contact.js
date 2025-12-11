import express from 'express'
import { body, validationResult } from 'express-validator'
import Contact from '../models/Contact.js'
import { sendContactEmail } from '../services/emailService.js'
import { rateLimiter } from '../middlewares/rateLimiter.js'

const router = express.Router()

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
]

// Submit contact form
router.post('/', rateLimiter, contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, email, subject, message } = req.body

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    })

    await contact.save()

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        timestamp: new Date().toISOString()
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
})

// Get contact messages (admin only - for future implementation)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const query = status ? { status } : {}
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')

    const total = await Contact.countDocuments(query)

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    })
  }
})

// Update contact status (admin only - for future implementation)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      })
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    })
  } catch (error) {
    console.error('Update contact status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    })
  }
})

export default router
