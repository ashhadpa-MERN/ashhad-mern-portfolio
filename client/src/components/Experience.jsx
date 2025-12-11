import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa'
import { HiCode, HiLightningBolt } from 'react-icons/hi'

const Experience = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const experiences = [
    {
      id: 1,
      title: 'MERN Stack Developer',
      company: 'WX Digital Agency (Limenzy Technologies)',
      companyUrl: 'https://www.wx.agency/',
      location: 'Remote',
      duration: '2022 - Present',
      type: 'Full-time',
      description: 'Leading full-stack development projects and mentoring junior developers.',
      achievements: [
        'Developed and maintained 15+ web applications using MERN stack',
        'Improved application performance by 40% through code optimization',
        'Led a team of 3 developers on major client projects',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored 5+ junior developers and conducted code reviews'
      ],
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'AWS', 'Docker', 'Redis'],
      current: true
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      companyUrl: '#',
      location: 'Kozhikode, Kerala',
      duration: '2021 - 2022',
      type: 'Full-time',
      description: 'Developed end-to-end web solutions for various clients.',
      achievements: [
        'Built 10+ responsive web applications from scratch',
        'Integrated third-party APIs including payment gateways',
        'Optimized database queries improving load times by 35%',
        'Collaborated with UI/UX designers to implement pixel-perfect designs',
        'Maintained 95%+ code coverage with comprehensive testing'
      ],
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Express.js', 'Tailwind CSS', 'Jest'],
      current: false
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Innovations',
      companyUrl: '#',
      location: 'Kochi, Kerala',
      duration: '2020 - 2021',
      type: 'Full-time',
      description: 'Focused on creating engaging user interfaces and experiences.',
      achievements: [
        'Developed 20+ responsive web interfaces',
        'Implemented modern CSS frameworks and animations',
        'Collaborated with backend team for API integration',
        'Improved user engagement metrics by 25%',
        'Maintained cross-browser compatibility across all projects'
      ],
      technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'Bootstrap', 'Git'],
      current: false
    },
    {
      id: 4,
      title: 'Web Development Intern',
      company: 'StartupHub',
      companyUrl: '#',
      location: 'Bangalore, Karnataka',
      duration: '2019 - 2020',
      type: 'Internship',
      description: 'Learned the fundamentals of web development and industry best practices.',
      achievements: [
        'Completed 5+ small-scale web projects',
        'Learned modern web development frameworks',
        'Participated in code reviews and team meetings',
        'Gained experience with version control and deployment',
        'Developed strong problem-solving and debugging skills'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'PHP'],
      current: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const timelineVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-dark-800">
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
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            My professional journey in web development
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={timelineVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-800 z-10">
                  {exp.current && (
                    <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    className="bg-white dark:bg-dark-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 group"
                    whileHover={{ y: -5 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-primary-500 dark:text-primary-400 font-semibold mb-2">
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center space-x-1"
                          >
                            <span>{exp.company}</span>
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </a>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaBriefcase />
                            <span>{exp.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <HiLightningBolt className="mr-2 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        <HiCode className="mr-2 text-blue-500" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-700 dark:to-dark-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and contribute to meaningful projects. 
              Let's discuss how I can help bring your ideas to life.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
