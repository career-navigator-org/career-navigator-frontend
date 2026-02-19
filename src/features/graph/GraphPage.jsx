import React, { useState } from 'react'
import styles from './GraphPage.module.css'

const SkillsModule = ({ title, description, skills: initialSkills }) => {
  const [skills, setSkills] = useState(initialSkills)
  const [draggedSkill, setDraggedSkill] = useState(null)

  const completedSkills = skills.filter(skill => skill.completed).length
  const totalSkills = skills.length
  const progressPercentage = (completedSkills / totalSkills) * 100
  const isProfessionReady = completedSkills === totalSkills

  const toggleSkill = (skillId) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === skillId
          ? { ...skill, completed: !skill.completed }
          : skill
      )
    )
  }

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
        <div className={styles.moduleSkillsWrapper}>
          <div className={styles.moduleGridGuide}>
            {Array(3).fill().map((_, colIndex) => (
              <div key={colIndex} className={styles.moduleGridCol}>
                {Array(2).fill().map((_, rowIndex) => (
                  <div key={rowIndex} className={styles.moduleGridCell}></div>
                ))}
              </div>
            ))}
          </div>

          {skills.map((skill, index) => {
            const pos = getSkillPosition(index, skills.length)
            
            return (
              <div
                key={skill.id}
                className={`${styles.skillCard} ${skill.completed ? styles.completed : ''} ${draggedSkill?.id === skill.id ? styles.dragging : ''}`}
                style={{
                  width: pos.width,
                  height: pos.height,
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  transform: `translate(-50%, -50%)`,
                  zIndex: draggedSkill?.id === skill.id ? 1000 : pos.zIndex,
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, skill)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, skill)}
                onClick={() => toggleSkill(skill.id)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.skillOrder}>#{skill.order}</span>
                    <div className={styles.checkboxWrapper}>
                      <input
                        type="checkbox"
                        checked={skill.completed}
                        onChange={() => {}}
                        className={styles.skillCheckbox}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  
                  <span className={styles.skillTitle}>{skill.title}</span>
                  
                  {skill.completed && (
                    <div className={styles.completedBadge}>
                      <svg className={styles.checkIcon} viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {isProfessionReady && (
        <div className={styles.moduleComplete}>
          <span className={styles.moduleCompleteBadge}>✅ Готово!</span>
        </div>
      )}
    </div>
  )
}

const GraphPage = () => {
  const modules = [
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
  ]

  return (
    <div className={`${styles.app} ${styles.lightTheme}`}>
      <div className={styles.background}>
        <div className={`${styles.gradientOrb} ${styles.orb1}`}></div>
        <div className={`${styles.gradientOrb} ${styles.orb2}`}></div>
        <div className={`${styles.gradientOrb} ${styles.orb3}`}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Skill Modules</h1>
          <p className={styles.subtitle}>Выбери свой путь обучения</p>
        </div>

        <div className={styles.modulesGrid}>
          {modules.map(module => (
            <div key={module.id} className={styles.moduleCard}>
              <SkillsModule 
                title={module.title}
                description={module.description}
                skills={module.skills}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GraphPage