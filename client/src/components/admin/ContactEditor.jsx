import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contentAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ContactEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    locationUrl: '',
    availability: 'available',
    availabilityMessage: '',
    socialLinks: []
  })

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const response = await contentAPI.getContactInfo()
      if (response.data.success) {
        setFormData(response.data.data)
      }
    } catch (error) {
      toast.error('Failed to load contact info')
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

  const handleSocialLinkChange = (index, field, value) => {
    const newLinks = [...formData.socialLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setFormData({ ...formData, socialLinks: newLinks })
  }

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { name: '', icon: '', url: '', color: '' }]
    })
  }

  const removeSocialLink = (index) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await contentAPI.updateContactInfo(formData)
      if (response.data.success) {
        toast.success('Contact info updated successfully!')
      }
    } catch (error) {
      toast.error('Failed to update contact info')
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
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location URL
          </label>
          <input
            type="url"
            name="locationUrl"
            value={formData.locationUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Availability Status
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Availability Message
        </label>
        <textarea
          name="availabilityMessage"
          value={formData.availabilityMessage}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Social Links
          </label>
          <button
            type="button"
            onClick={addSocialLink}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Add Link
          </button>
        </div>
        <div className="space-y-4">
          {formData.socialLinks.map((link, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <input
                type="text"
                placeholder="Name"
                value={link.name}
                onChange={(e) => handleSocialLinkChange(index, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Icon (e.g., FaGithub)"
                value={link.icon}
                onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Color class"
                  value={link.color}
                  onChange={(e) => handleSocialLinkChange(index, 'color', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
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

export default ContactEditor


