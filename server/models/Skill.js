import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    }
  }]
}, {
  timestamps: true
})

const Skill = mongoose.model('Skill', skillSchema)

export default Skill


