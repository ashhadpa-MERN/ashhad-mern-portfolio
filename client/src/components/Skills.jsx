import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaFigma,
  FaGithub,
  FaNpm,
  FaCode
} from 'react-icons/fa'
import { 
  SiMongodb, 
  SiExpress, 
  SiRedux, 
  SiTailwindcss, 
  SiBootstrap,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiVercel,
  SiNetlify,
  SiJest,
  SiWebpack,
  SiVite
} from 'react-icons/si'
import { HiCode, HiDatabase, HiServer, HiCog } from 'react-icons/hi'

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: HiCode,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'JavaScript', icon: FaJs, level: 95 },
        { name: 'TypeScript', icon: FaJs, level: 85 },
        { name: 'Python', icon: FaPython, level: 80 },
        { name: 'HTML5', icon: FaHtml5, level: 95 },
        { name: 'CSS3', icon: FaCss3Alt, level: 90 }
      ]
    },
    {
      title: 'Frontend Frameworks',
      icon: FaReact,
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'React.js', icon: FaReact, level: 95 },
        { name: 'Redux Toolkit', icon: SiRedux, level: 90 },
        { name: 'Next.js', icon: FaReact, level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
        { name: 'Bootstrap', icon: SiBootstrap, level: 85 }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: HiServer,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90 },
        { name: 'Express.js', icon: SiExpress, level: 90 },
        { name: 'REST APIs', icon: HiServer, level: 95 },
        { name: 'GraphQL', icon: HiServer, level: 75 },
        { name: 'JWT Auth', icon: HiServer, level: 85 }
      ]
    },
    {
      title: 'Databases',
      icon: HiDatabase,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 90 },
        { name: 'MySQL', icon: SiMysql, level: 80 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 75 },
        { name: 'Redis', icon: SiRedis, level: 85 },
        { name: 'Firebase', icon: SiFirebase, level: 80 }
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: HiCog,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90 },
        { name: 'Docker', icon: FaDocker, level: 75 },
        { name: 'AWS', icon: FaAws, level: 80 },
        { name: 'Vercel', icon: SiVercel, level: 85 },
        { name: 'Netlify', icon: SiNetlify, level: 80 }
      ]
    },
    {
      title: 'Development Tools',
      icon: FaGithub,
      color: 'from-indigo-500 to-purple-500',
      skills: [
        { name: 'VS Code', icon: FaCode, level: 95 },
        { name: 'GitHub', icon: FaGithub, level: 90 },
        { name: 'NPM', icon: FaNpm, level: 85 },
        { name: 'Jest', icon: SiJest, level: 80 },
        { name: 'Vite', icon: SiVite, level: 85 }
      ]
    }
  ]

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

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-dark-900">
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
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <category.icon className="text-3xl" />
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-6 space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="flex items-center justify-between group-hover:bg-gray-50 dark:group-hover:bg-dark-700 p-3 rounded-lg transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl text-gray-600 dark:text-gray-300">
                        <skill.icon />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Summary */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Always Learning & Growing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm constantly exploring new technologies and frameworks to stay at the forefront 
              of web development. Currently diving deeper into cloud architecture, microservices, 
              and advanced React patterns. I believe in the power of continuous learning and 
              adapting to the ever-evolving tech landscape.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {['Microservices', 'Kubernetes', 'GraphQL', 'Web3', 'AI/ML'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white dark:bg-dark-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
