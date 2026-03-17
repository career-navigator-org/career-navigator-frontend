import { useState, useEffect } from 'react'

import styles from './ProgressPage.module.css'

import { SkillCard } from './components/skillCard/SkillCard'
//import { generateResumePDF } from './utils/pdfGenerator'
// import { ThemeToggle } from '../../app/components/ThemeToggle/ThemeToggle'

const ProfessionalCard = ({ title, description, skills: initialSkills, onSkillChange }) => {
  const [skills, setSkills] = useState(initialSkills)
  const [draggedSkill, setDraggedSkill] = useState(null)

  useEffect(() => {
    setSkills(initialSkills)
  }, [initialSkills])

  const completedSkills = skills.filter(skill => skill.completed).length
  const totalSkills = skills.length
  const progressPercentage = (completedSkills / totalSkills) * 100

  const getSkillPosition = (index, total) => {
    const cardWidth = 100
    const cardHeight = 65

    const cols = 3
    const row = Math.floor(index / cols)
    const col = index % cols

    const horizontalGap = 110
    const verticalGap = 75

    const totalRows = Math.ceil(total / cols)

    const startY = -((totalRows - 1) * verticalGap) / 2
    const startX = -((cols - 1) * horizontalGap) / 2

    const randomOffsetX = (index % 3 - 1) * 3
    const randomOffsetY = (index % 2) * 2

    return {
      x: startX + col * horizontalGap + randomOffsetX,
      y: startY + row * verticalGap + randomOffsetY,
      width: cardWidth,
      height: cardHeight,
      zIndex: index + 5
    }
  }

  const toggleSkill = (skillId) => {
    setSkills(prevSkills => {
      const updatedSkills = prevSkills.map(skill =>
        skill.id === skillId
          ? { ...skill, completed: !skill.completed }
          : skill
      )
      onSkillChange?.(updatedSkills)
      return updatedSkills
    })
  }

  const handleDragStart = (e, skill) => {
    setDraggedSkill(skill)
    e.dataTransfer.setData('text/plain', skill.id)
    e.currentTarget.style.opacity = '0.6'
  }

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1'
    setDraggedSkill(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetSkill) => {
    e.preventDefault()

    if (!draggedSkill || draggedSkill.id === targetSkill.id) return

    const updatedSkills = [...skills]
    const draggedIndex = updatedSkills.findIndex(s => s.id === draggedSkill.id)
    const targetIndex = updatedSkills.findIndex(s => s.id === targetSkill.id)

    const [removedSkill] = updatedSkills.splice(draggedIndex, 1)
    updatedSkills.splice(targetIndex, 0, removedSkill)

    const reorderedSkills = updatedSkills.map((skill, index) => ({
      ...skill,
      order: index + 1
    }))

    setSkills(reorderedSkills)
    onSkillChange?.(reorderedSkills)
  }

  return (
    <div className={styles.skillsModule}>
      <div className={styles.moduleHeader}>
        <h3 className={styles.moduleTitle}>{title}</h3>
        <p className={styles.moduleDescription}>{description}</p>
      </div>
      <div className={styles.moduleProgress}>
        <div className={styles.moduleProgressTrack}>
          <div
            className={styles.moduleProgressFill}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className={styles.moduleProgressText}>
          {completedSkills}/{totalSkills}
        </span>
      </div>
      <div className={styles.moduleSkillsField}>
        {skills.map((item, index) => (
          <SkillCard
            key={item.id}
            index={index}
            skill={item}
            totalSkills={skills.length}
            getSkillPosition={getSkillPosition}
            toggleSkill={toggleSkill}
            draggedSkill={draggedSkill}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  )
}

const ProgressPage = ({ userData }) => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Frontend Basics',
      description: 'Основы фронтенда',
      skills: [
        { id: 101, title: 'HTML', completed: false, order: 1 },
        { id: 102, title: 'CSS', completed: false, order: 2 },
        { id: 103, title: 'JavaScript', completed: false, order: 3 },
        { id: 104, title: 'Git', completed: false, order: 4 }
      ]
    },
    {
      id: 2,
      title: 'Frontend Advanced',
      description: 'Продвинутый уровень',
      skills: [
        { id: 201, title: 'React', completed: false, order: 1 },
        { id: 202, title: 'TypeScript', completed: false, order: 2 },
        { id: 203, title: 'Redux', completed: false, order: 3 },
        { id: 204, title: 'Next.js', completed: false, order: 4 }
      ]
    },
    {
      id: 3,
      title: 'DevOps Tools',
      description: 'Инструменты разработки',
      skills: [
        { id: 301, title: 'Docker', completed: false, order: 1 },
        { id: 302, title: 'Webpack', completed: false, order: 2 },
        { id: 303, title: 'Jest', completed: false, order: 3 },
        { id: 304, title: 'GraphQL', completed: false, order: 4 }
      ]
    }
  ])

  const handleSkillChange = (moduleId, updatedSkills) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? { ...module, skills: updatedSkills }
          : module
      )
    )
  }

  const totalCompleted = modules.reduce(
    (sum, module) => sum + module.skills.filter(s => s.completed).length,
    0
  )
  const totalSkills = modules.reduce(
    (sum, module) => sum + module.skills.length,
    0
  )
  const overallProgress = Math.round((totalCompleted / totalSkills) * 100)

  const handleCreateResume = async () => {
    const defaultUserData = {
      fullName: 'Пользователь',
      birthDate: '—',
      educationStatus: '—',
      city: '—',
      career: '—'
    };

    const dataForPDF = userData || defaultUserData;

    //generateResumePDF(dataForPDF, modules);
  }

  return (
    <div className={`${styles.app} ${styles.lightTheme}`}>
      {/* <ThemeToggle /> */}

      <div className={styles.content}>
        <div className={styles.header}>
          {/* {userData && (
            <div className={styles.userInfo}>
              <p>👤 {userData.fullName}</p>
              <p>📍 {userData.city}</p>
              <p>🎯 {userData.career}</p>
            </div>
          )} */}
          <div className={styles.overallProgress}>
            <span className={styles.overallProgressText}>
              Общий прогресс: {totalCompleted}/{totalSkills} ({overallProgress}%)
            </span>
            {/* <div className={styles.overallProgressBar}>
              <div
                className={styles.overallProgressFill}
                style={{ width: `${overallProgress}%` }}
              />
            </div> */}
          </div>
        </div>

        <div className={styles.modulesGrid}>
          {modules.map(module => (
            <div key={module.id} className={styles.moduleCard}>
              <ProfessionalCard
                title={module.title}
                description={module.description}
                skills={module.skills}
                onSkillChange={(updatedSkills) => handleSkillChange(module.id, updatedSkills)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressPage