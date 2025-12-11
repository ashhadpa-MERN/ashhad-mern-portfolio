import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ExperienceEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [experiences, setExperiences] = useState([])
  const [editingExp, setEditingExp] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    companyUrl: '',
    location: '',
    duration: '',
    type: 'Full-time',
    description: '',
    achievements: [],
    technologies: [],
    current: false,
    order: 0
  })

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    try {
      const response = await contentAPI.getExperiences()
      if (response.data.success) {
        setExperiences(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load experiences')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    })
  }

  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingExp) {
        await contentAPI.updateExperience(editingExp._id, formData)
        toast.success('Experience updated successfully!')
      } else {
        await contentAPI.createExperience(formData)
        toast.success('Experience created successfully!')
      }
      setEditingExp(null)
      setFormData({
        title: '',
        company: '',
        companyUrl: '',
        location: '',
        duration: '',
        type: 'Full-time',
        description: '',
        achievements: [],
        technologies: [],
        current: false,
        order: 0
      })
      loadExperiences()
    } catch (error) {
      toast.error('Failed to save experience')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (exp) => {
    setEditingExp(exp)
    setFormData({
      title: exp.title,
      company: exp.company,
      companyUrl: exp.companyUrl || '',
      location: exp.location,
      duration: exp.duration,
      type: exp.type,
      description: exp.description,
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
      current: exp.current || false,
      order: exp.order || 0
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return

    try {
      await contentAPI.deleteExperience(id)
      toast.success('Experience deleted successfully!')
      loadExperiences()
    } catch (error) {
      toast.error('Failed to delete experience')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 space-y-6"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {editingExp ? 'Edit Experience' : 'Create New Experience'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company URL
            </label>
            <input
              type="url"
              name="companyUrl"
              value={formData.companyUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              placeholder="e.g., 2022 - Present"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order (for sorting)
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="w-4 h-4 text-primary-500 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Position
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Achievements
            </label>
            <button
              type="button"
              onClick={() => addArrayItem('achievements')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Achievement
            </button>
          </div>
          <div className="space-y-2">
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('achievements', index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
              Technologies
            </label>
            <button
              type="button"
              onClick={() => addArrayItem('technologies')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Technology
            </button>
          </div>
          <div className="space-y-2">
            {formData.technologies.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('technologies', index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            type="submit"
            disabled={saving}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50"
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
          >
            {saving ? 'Saving...' : editingExp ? 'Update' : 'Create'}
          </motion.button>
          {editingExp && (
            <button
              type="button"
              onClick={() => {
                setEditingExp(null)
                setFormData({
                  title: '',
                  company: '',
                  companyUrl: '',
                  location: '',
                  duration: '',
                  type: 'Full-time',
                  description: '',
                  achievements: [],
                  technologies: [],
                  current: false,
                  order: 0
                })
              }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.form>

      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Existing Experiences</h3>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} - {exp.duration}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceEditor


