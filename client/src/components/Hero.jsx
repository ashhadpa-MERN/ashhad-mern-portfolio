import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import { HiCode } from 'react-icons/hi'
import { contentAPI } from '../services/api'
import * as Icons from 'react-icons/fa'
import * as HiIcons from 'react-icons/hi'

const Hero = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const [heroData, setHeroData] = useState({
    name: 'Ash Had P A',
    title: 'MERN Stack Developer',
    subtitle: 'Building amazing web experiences with React, Node.js, and MongoDB',
    description: 'Passionate about creating scalable, performant, and user-friendly applications.',
    company: 'WX Digital Agency',
    companyUrl: 'https://www.wx.agency/',
    experience: '3+ years of experience in full-stack development',
    initials: 'AH',
    socialLinks: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const response = await contentAPI.getHero()
        if (isMounted && response?.data?.success && response?.data?.data) {
          setHeroData(response.data.data)
        }
      } catch (error) {
        console.error('Failed to load hero data:', error)
        // Keep default data that's already set
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Removed GSAP animation to prevent conflicts with Framer Motion
  // Using Framer Motion only for smoother animations


  const getIcon = (iconName) => {
    if (!iconName) return null
    const IconComponent = Icons[iconName] || HiIcons[iconName]
    return IconComponent || null
  }

  // Component always renders with data (default or from API)

  const socialLinks = heroData.socialLinks?.map(link => ({
    ...link,
    icon: getIcon(link.icon) || FaGithub
  })) || []

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden z-10" style={{ opacity: 1, visibility: 'visible' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-200 dark:bg-secondary-800 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-primary-300 dark:bg-primary-700 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            ref={textRef}
            className="text-center lg:text-left relative z-10"
            style={{ opacity: 1, visibility: 'visible', display: 'block' }}
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 mb-4">
                <HiCode className="mr-2" />
                {heroData.title || 'MERN Stack Developer'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">
                {heroData.name}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {heroData.subtitle}
            </p>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl">
              {heroData.description}
              {heroData.company && (
                <>
                  {' '}Currently working at{' '}
                  <a 
                    href={heroData.companyUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-300"
                  >
                    {heroData.company}
                  </a>
                </>
              )}
              {heroData.experience && ` with ${heroData.experience}.`}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View My Work
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="mr-2" />
                Download Resume
              </motion.a>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex justify-center lg:justify-start space-x-6 mt-12">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon
                  return IconComponent ? (
                    <motion.a
                      key={link.name}
                      href={link.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${link.color || ''} transition-colors duration-300`}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={link.name}
                    >
                      <IconComponent />
                    </motion.a>
                  ) : null
                })}
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div
            ref={imageRef}
            className="flex justify-center lg:justify-end relative z-10"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              
              {/* Profile Image Container */}
              <motion.div
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary-500 dark:text-primary-400">
                    {heroData.initials || 'AH'}
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <HiCode />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                3+
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
