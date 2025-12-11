import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaUsers, FaDatabase } from 'react-icons/fa'
import { HiLightningBolt, HiCode } from 'react-icons/hi'

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Talenton 2.0',
      description: 'A comprehensive talent management platform built with MERN stack, featuring real-time collaboration, advanced analytics, and seamless user experience.',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://talenton.app/',
      githubUrl: 'https://github.com/ashhadpa/talenton-2.0',
      category: 'fullstack',
      featured: true,
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Socket.io', 'Redis'],
      features: [
        'Real-time collaboration tools',
        'Advanced user analytics',
        'Scalable microservices architecture',
        'Mobile-responsive design',
        'Third-party integrations'
      ],
      stats: {
        users: '10K+',
        uptime: '99.9%',
        performance: '95%'
      }
    },
    {
      id: 2,
      title: 'E-Commerce MERN Platform',
      description: 'Full-featured e-commerce solution with admin dashboard, payment integration, inventory management, and order tracking system.',
      image: '/api/placeholder/600/400',
      liveUrl: '#',
      githubUrl: 'https://github.com/ashhadpa/ecommerce-mern',
      category: 'fullstack',
      featured: true,
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Multer'],
      features: [
        'Secure payment processing',
        'Admin dashboard',
        'Inventory management',
        'Order tracking',
        'User authentication'
      ],
      stats: {
        orders: '5K+',
        revenue: '$50K+',
        products: '500+'
      }
    },
    {
      id: 3,
      title: 'Real-Time Chat Application',
      description: 'Modern chat application with real-time messaging, file sharing, group chats, and emoji reactions using Socket.io.',
      image: '/api/placeholder/600/400',
      liveUrl: '#',
      githubUrl: 'https://github.com/ashhadpa/realtime-chat',
      category: 'fullstack',
      featured: false,
      technologies: ['React.js', 'Node.js', 'Socket.io', 'MongoDB', 'JWT', 'Cloudinary'],
      features: [
        'Real-time messaging',
        'File sharing',
        'Group chats',
        'Emoji reactions',
        'Message encryption'
      ],
      stats: {
        messages: '100K+',
        users: '2K+',
        uptime: '99.8%'
      }
    },
    {
      id: 4,
      title: 'API Integration Hub',
      description: 'Centralized API management platform integrating HubSpot, Stripe, PayPal, and other third-party services with automated workflows.',
      image: '/api/placeholder/600/400',
      liveUrl: '#',
      githubUrl: 'https://github.com/ashhadpa/api-integration-hub',
      category: 'backend',
      featured: false,
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'HubSpot API', 'Stripe API'],
      features: [
        'Multi-API integration',
        'Automated workflows',
        'Data synchronization',
        'Error handling',
        'Rate limiting'
      ],
      stats: {
        apis: '15+',
        requests: '1M+',
        uptime: '99.9%'
      }
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with dark/light theme, smooth animations, and contact form integration.',
      image: '/api/placeholder/600/400',
      liveUrl: 'https://ashhadpa.dev',
      githubUrl: 'https://github.com/ashhadpa/portfolio',
      category: 'frontend',
      featured: false,
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'EmailJS'],
      features: [
        'Dark/Light theme',
        'Smooth animations',
        'Contact form',
        'SEO optimized',
        'Mobile responsive'
      ],
      stats: {
        visitors: '5K+',
        performance: '98%',
        accessibility: '95%'
      }
    },
    {
      id: 6,
      title: 'Task Management System',
      description: 'Collaborative task management tool with drag-and-drop functionality, team collaboration, and progress tracking.',
      image: '/api/placeholder/600/400',
      liveUrl: '#',
      githubUrl: 'https://github.com/ashhadpa/task-manager',
      category: 'fullstack',
      featured: false,
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Socket.io'],
      features: [
        'Drag-and-drop interface',
        'Team collaboration',
        'Progress tracking',
        'Deadline management',
        'File attachments'
      ],
      stats: {
        tasks: '50K+',
        teams: '500+',
        efficiency: '40%'
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { id: 'backend', name: 'Backend', count: projects.filter(p => p.category === 'backend').length }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white dark:bg-dark-900">
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
            My <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            A showcase of my recent work and side projects
          </motion.p>

          {/* Filter Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              whileHover={{ y: -10 }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary-500 dark:text-primary-400">
                    {project.title.charAt(0)}
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-800 hover:bg-primary-500 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <HiLightningBolt className="mr-2 text-yellow-500" />
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <HiCode className="mr-2 text-blue-500" />
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(project.stats).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-primary-500 dark:text-primary-400">
                        {value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaRocket className="mr-2" />
                      Live Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaCode className="mr-2" />
                      Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in My Work?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always working on new projects and exploring innovative solutions. 
              Check out my GitHub for more projects and contributions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://github.com/ashhadpa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="mr-2" />
                View All Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <FaUsers className="mr-2" />
                Let's Collaborate
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
