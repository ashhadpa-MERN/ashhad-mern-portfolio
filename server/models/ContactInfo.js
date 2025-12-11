import mongoose from 'mongoose'

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: 'ashaad.pa@gmail.com'
  },
  phone: {
    type: String,
    default: '+91 9876543210'
  },
  location: {
    type: String,
    default: 'Kozhikode, Kerala, India'
  },
  locationUrl: {
    type: String,
    default: 'https://maps.google.com/?q=Kozhikode,Kerala,India'
  },
  socialLinks: [{
    name: String,
    icon: String,
    url: String,
    color: String
  }],
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  availabilityMessage: {
    type: String,
    default: 'I\'m currently available for freelance projects and full-time opportunities.'
  }
}, {
  timestamps: true
})

contactInfoSchema.statics.getContactInfo = async function() {
  let contactInfo = await this.findOne()
  if (!contactInfo) {
    contactInfo = await this.create({
      socialLinks: [
        { name: 'LinkedIn', icon: 'FaLinkedin', url: 'https://linkedin.com/in/ashhad-36L00009', color: 'hover:text-blue-600' },
        { name: 'GitHub', icon: 'FaGithub', url: 'https://github.com/ashhadpa', color: 'hover:text-gray-900 dark:hover:text-white' },
        { name: 'Twitter', icon: 'FaTwitter', url: 'https://twitter.com/ashhadpa', color: 'hover:text-blue-400' }
      ]
    })
  }
  return contactInfo
}

const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema)

export default ContactInfo


