import mongoose from 'mongoose'

const aboutSchema = new mongoose.Schema({
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
  bio: {
    type: String,
    required: true,
    default: 'I\'m a passionate full-stack developer with over 3 years of experience building scalable web applications.'
  },
  bio2: {
    type: String,
    default: 'My expertise lies in the MERN stack, but I\'m always eager to learn new technologies and frameworks.'
  },
  company: {
    type: String,
    default: 'WX Digital Agency (Limenzy Technologies)'
  },
  companyUrl: {
    type: String,
    default: 'https://www.wx.agency/'
  },
  profileImage: {
    type: String,
    default: ''
  },
  initials: {
    type: String,
    default: 'AH'
  },
  resumeUrl: {
    type: String,
    default: '/resume.pdf'
  },
  stats: [{
    icon: String,
    number: String,
    label: String
  }],
  skills: [{
    type: String
  }]
}, {
  timestamps: true
})

aboutSchema.statics.getAbout = async function() {
  let about = await this.findOne()
  if (!about) {
    about = await this.create({
      stats: [
        { icon: 'FaCode', number: '3+', label: 'Years Experience' },
        { icon: 'FaRocket', number: '50+', label: 'Projects Completed' },
        { icon: 'FaUsers', number: '20+', label: 'Happy Clients' },
        { icon: 'HiLightningBolt', number: '99%', label: 'Success Rate' }
      ],
      skills: [
        'Full-Stack Development',
        'MERN Stack',
        'API Development',
        'Database Design',
        'Cloud Deployment',
        'Agile Methodology'
      ]
    })
  }
  return about
}

const About = mongoose.model('About', aboutSchema)

export default About


