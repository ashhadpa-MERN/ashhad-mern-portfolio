import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentAPI } from '../../services/api'
import toast from 'react-hot-toast'

const AboutEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    bio2: '',
    company: '',
    companyUrl: '',
    initials: '',
    resumeUrl: '',
    stats: [],
    skills: []
  })

  useEffect(() => {
    loadAbout()
  }, [])

  const loadAbout = async () => {
    try {
      const response = await contentAPI.getAbout()
      if (response.data.success) {
        setFormData(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load about content')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setFormData({ ...formData, stats: newStats })
  }

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { icon: '', number: '', label: '' }]
    })
  }

  const removeStat = (index) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index)
    })
  }

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills]
    newSkills[index] = value
    setFormData({ ...formData, skills: newSkills })
  }

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    })
  }

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await contentAPI.updateAbout(formData)
      if (response.data.success) {
        toast.success('About content updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update about content')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Initials
          </label>
          <input
            type="text"
            name="initials"
            value={formData.initials}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume URL
          </label>
          <input
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio (First Paragraph)
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio (Second Paragraph)
        </label>
        <textarea
          name="bio2"
          value={formData.bio2}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stats
          </label>
          <button
            type="button"
            onClick={addStat}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Add Stat
          </button>
        </div>
        <div className="space-y-4">
          {formData.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <input
                type="text"
                placeholder="Icon (e.g., FaCode)"
                value={stat.icon}
                onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Number"
                value={stat.number}
                onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Label"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => removeStat(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Skills
          </label>
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Add Skill
          </button>
        </div>
        <div className="space-y-2">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder="Skill name"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={saving}
        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50"
        whileHover={{ scale: saving ? 1 : 1.02 }}
        whileTap={{ scale: saving ? 1 : 0.98 }}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </motion.button>
    </motion.form>
  )
}

export default AboutEditor


