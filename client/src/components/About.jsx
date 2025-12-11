import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { FaCode, FaRocket, FaUsers, FaHeart } from 'react-icons/fa'
import { HiLightningBolt, HiCode } from 'react-icons/hi'
import { contentAPI } from '../services/api'
import * as Icons from 'react-icons/fa'
import * as HiIcons from 'react-icons/hi'

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [aboutData, setAboutData] = useState({
    name: 'Ash Had P A',
    title: 'MERN Stack Developer',
    bio: 'I\'m a passionate full-stack developer with over 3 years of experience building scalable web applications.',
    bio2: 'My expertise lies in the MERN stack, but I\'m always eager to learn new technologies and frameworks.',
    company: 'WX Digital Agency (Limenzy Technologies)',
    companyUrl: 'https://www.wx.agency/',
    initials: 'AH',
    resumeUrl: '/resume.pdf',
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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const response = await contentAPI.getAbout()
        if (isMounted && response?.data?.success && response?.data?.data) {
          setAboutData(response.data.data)
        }
      } catch (error) {
        console.error('Failed to load about data:', error)
        // Keep default data that's already set
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])


  const getIcon = (iconName) => {
    if (!iconName) return null
    const IconComponent = Icons[iconName] || HiIcons[iconName]
    return IconComponent || null
  }

  // Component always renders with data (default or from API)

  const stats = aboutData.stats?.map(stat => {
    const iconName = typeof stat === 'object' ? stat.icon : null
    const iconComponent = iconName ? getIcon(iconName) : FaCode
    return {
      icon: iconComponent || FaCode,
      number: stat.number || '',
      label: stat.label || '',
      key: stat.label || stat._id || Math.random()
    }
  }).filter(stat => stat.number && stat.label) || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Passionate about creating digital solutions that make a difference
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image and Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative inline-block">
                <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-primary-500 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary-500 dark:text-primary-400">
                      {aboutData.initials || 'AH'}
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <HiCode />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {aboutData.name}
              </h3>
              <p className="text-lg text-primary-500 dark:text-primary-400 font-semibold">
                {aboutData.title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {aboutData.bio}
                {aboutData.company && (
                  <>
                    {' '}Currently working at{' '}
                    <a 
                      href={aboutData.companyUrl || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors duration-300"
                    >
                      {aboutData.company}
                    </a>
                    , where I help create innovative digital solutions for clients worldwide.
                  </>
                )}
              </p>
              {aboutData.bio2 && (
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {aboutData.bio2}
                </p>
              )}
            </motion.div>
          </motion.div>

          {/* Stats and Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {/* Stats Grid */}
            {stats.length > 0 ? (
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={stat.key || stat.label || index}
                      className="text-center p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      whileHover={{ y: -5 }}
                    >
                      {IconComponent ? (
                        <div className="text-3xl text-primary-500 dark:text-primary-400 mb-2">
                          <IconComponent />
                        </div>
                      ) : (
                        <div className="text-3xl text-primary-500 dark:text-primary-400 mb-2">
                          <FaCode />
                        </div>
                      )}
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="text-center p-6">
                <p className="text-gray-600 dark:text-gray-400">No stats available</p>
              </motion.div>
            )}

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Core Competencies
              </h4>
              {aboutData.skills && aboutData.skills.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {aboutData.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white dark:bg-dark-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Download Resume Button */}
            {aboutData.resumeUrl && (
              <motion.div variants={itemVariants} className="text-center lg:text-left">
                <motion.a
                  href={aboutData.resumeUrl}
                  download
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart className="mr-2" />
                  Download Resume
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
