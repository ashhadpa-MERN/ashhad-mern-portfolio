import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentAPI } from '../../services/api'
import toast from 'react-hot-toast'

const SkillsEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [skills, setSkills] = useState([])
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    icon: '',
    color: '',
    skills: []
  })

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const response = await contentAPI.getSkills()
      if (response.data.success) {
        setSkills(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load skills')
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

  const handleSkillItemChange = (index, field, value) => {
    const newSkills = [...formData.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setFormData({ ...formData, skills: newSkills })
  }

  const addSkillItem = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: '', icon: '', level: 50 }]
    })
  }

  const removeSkillItem = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingSkill) {
        await contentAPI.updateSkill(editingSkill._id, formData)
        toast.success('Skill category updated successfully!')
      } else {
        await contentAPI.createSkill(formData)
        toast.success('Skill category created successfully!')
      }
      setEditingSkill(null)
      setFormData({ category: '', title: '', icon: '', color: '', skills: [] })
      loadSkills()
    } catch (error) {
      toast.error('Failed to save skill category')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setFormData({
      category: skill.category,
      title: skill.title,
      icon: skill.icon,
      color: skill.color,
      skills: skill.skills || []
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill category?')) return

    try {
      await contentAPI.deleteSkill(id)
      toast.success('Skill category deleted successfully!')
      loadSkills()
    } catch (error) {
      toast.error('Failed to delete skill category')
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
          {editingSkill ? 'Edit Skill Category' : 'Create New Skill Category'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
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
              Icon (e.g., FaReact)
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color (e.g., from-blue-500 to-cyan-500)
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skills
            </label>
            <button
              type="button"
              onClick={addSkillItem}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Skill
            </button>
          </div>
          <div className="space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <input
                  type="text"
                  placeholder="Name"
                  value={skill.name}
                  onChange={(e) => handleSkillItemChange(index, 'name', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Icon"
                  value={skill.icon}
                  onChange={(e) => handleSkillItemChange(index, 'icon', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Level (0-100)"
                  value={skill.level}
                  onChange={(e) => handleSkillItemChange(index, 'level', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                  min="0"
                  max="100"
                />
                <button
                  type="button"
                  onClick={() => removeSkillItem(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
            {saving ? 'Saving...' : editingSkill ? 'Update' : 'Create'}
          </motion.button>
          {editingSkill && (
            <button
              type="button"
              onClick={() => {
                setEditingSkill(null)
                setFormData({ category: '', title: '', icon: '', color: '', skills: [] })
              }}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700"
            >
              Cancel
            </button>
          )}
        </div>
      </motion.form>

      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Existing Skill Categories</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{skill.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
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

export default SkillsEditor


