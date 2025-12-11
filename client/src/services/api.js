import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    // Add token to all requests if available
    // Public GET routes will ignore it, but admin routes need it
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle token expiration and 403 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't handle errors for public GET routes (they might fail for other reasons)
    const isPublicGetRoute = error.config?.method?.toUpperCase() === 'GET' && 
                            !error.config?.url?.includes('/auth/')
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear invalid tokens
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Only redirect if we're on an admin page and it's not a public route
      if (window.location.pathname.startsWith('/admin') && !isPublicGetRoute) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) => api.post('/auth/register', { username, email, password }),
  verify: () => api.get('/auth/verify'),
  changePassword: (currentPassword, newPassword) => 
    api.put('/auth/change-password', { currentPassword, newPassword })
}

// Content API
export const contentAPI = {
  // Hero
  getHero: () => api.get('/content/hero'),
  updateHero: (data) => api.put('/content/hero', data),

  // About
  getAbout: () => api.get('/content/about'),
  updateAbout: (data) => api.put('/content/about', data),

  // Skills
  getSkills: () => api.get('/content/skills'),
  createSkill: (data) => api.post('/content/skills', data),
  updateSkill: (id, data) => api.put(`/content/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/content/skills/${id}`),

  // Experiences
  getExperiences: () => api.get('/content/experiences'),
  createExperience: (data) => api.post('/content/experiences', data),
  updateExperience: (id, data) => api.put(`/content/experiences/${id}`, data),
  deleteExperience: (id) => api.delete(`/content/experiences/${id}`),

  // Projects
  getProjects: (category = 'all') => api.get(`/content/projects?category=${category}`),
  createProject: (data) => api.post('/content/projects', data),
  updateProject: (id, data) => api.put(`/content/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/content/projects/${id}`),

  // Contact Info
  getContactInfo: () => api.get('/content/contact-info'),
  updateContactInfo: (data) => api.put('/content/contact-info', data)
}

export default api

