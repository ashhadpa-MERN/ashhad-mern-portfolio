import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ProjectsEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    category: 'fullstack',
    featured: false,
    technologies: [],
    features: [],
    stats: {},
    order: 0
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await contentAPI.getProjects('all')
      if (response.data.success) {
        setProjects(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load projects')
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

  const handleStatChange = (key, value) => {
    setFormData({
      ...formData,
      stats: { ...formData.stats, [key]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingProject) {
        await contentAPI.updateProject(editingProject._id, formData)
        toast.success('Project updated successfully!')
      } else {
        await contentAPI.createProject(formData)
        toast.success('Project created successfully!')
      }
      setEditingProject(null)
      setFormData({
        title: '',
        description: '',
        image: '',
        liveUrl: '',
        githubUrl: '',
        category: 'fullstack',
        featured: false,
        technologies: [],
        features: [],
        stats: {},
        order: 0
      })
      loadProjects()
    } catch (error) {
      toast.error('Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      category: project.category,
      featured: project.featured || false,
      technologies: project.technologies || [],
      features: project.features || [],
      stats: project.stats || {},
      order: project.order || 0
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      await contentAPI.deleteProject(id)
      toast.success('Project deleted successfully!')
      loadProjects()
    } catch (error) {
      toast.error('Failed to delete project')
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
          {editingProject ? 'Edit Project' : 'Create New Project'}
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
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="fullstack">Full Stack</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Live URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order
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
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-primary-500 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured Project
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
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Features
            </label>
            <button
              type="button"
              onClick={() => addArrayItem('features')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleArrayChange('features', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('features', index)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Stats (Key-Value pairs)
          </label>
          <div className="space-y-2">
            {Object.entries(formData.stats).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => {
                    const newStats = { ...formData.stats }
                    delete newStats[key]
                    newStats[e.target.value] = value
                    setFormData({ ...formData, stats: newStats })
                  }}
                  className="w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="Key"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleStatChange(key, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="Value"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newStats = { ...formData.stats }
                    delete newStats[key]
                    setFormData({ ...formData, stats: newStats })
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleStatChange(`stat${Object.keys(formData.stats).length}`, '')}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Add Stat
            </button>
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
            {saving ? 'Saving...' : editingProject ? 'Update' : 'Create'}
          </motion.button>
          {editingProject && (
            <button
              type="button"
              onClick={() => {
                setEditingProject(null)
                setFormData({
                  title: '',
                  description: '',
                  image: '',
                  liveUrl: '',
                  githubUrl: '',
                  category: 'fullstack',
                  featured: false,
                  technologies: [],
                  features: [],
                  stats: {},
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
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Existing Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.category} {project.featured && '(Featured)'}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
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

export default ProjectsEditor


