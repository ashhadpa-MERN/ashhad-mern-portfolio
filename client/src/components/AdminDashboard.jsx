import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaBriefcase, 
  FaFolderOpen, 
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import HeroEditor from './admin/HeroEditor'
import AboutEditor from './admin/AboutEditor'
import SkillsEditor from './admin/SkillsEditor'
import ExperienceEditor from './admin/ExperienceEditor'
import ProjectsEditor from './admin/ProjectsEditor'
import ContactEditor from './admin/ContactEditor'

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: FaHome },
    { id: 'about', name: 'About Section', icon: FaUser },
    { id: 'skills', name: 'Skills', icon: FaCode },
    { id: 'experience', name: 'Experience', icon: FaBriefcase },
    { id: 'projects', name: 'Projects', icon: FaFolderOpen },
    { id: 'contact', name: 'Contact Info', icon: FaEnvelope }
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroEditor />
      case 'about':
        return <AboutEditor />
      case 'skills':
        return <SkillsEditor />
      case 'experience':
        return <ExperienceEditor />
      case 'projects':
        return <ProjectsEditor />
      case 'contact':
        return <ContactEditor />
      default:
        return <HeroEditor />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? '280px' : '80px' }}
        className="bg-white dark:bg-dark-800 shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <section.icon className="text-xl" />
              {sidebarOpen && <span className="font-medium">{section.name}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <div className="mb-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium">{user?.username}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          )}
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {sections.find(s => s.id === activeSection)?.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your portfolio content
            </p>
          </div>
          {renderEditor()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard


