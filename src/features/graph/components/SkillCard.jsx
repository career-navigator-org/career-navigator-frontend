import React from 'react'
import styles from '../GraphPage.module.css'

export const SkillCard = ({ 
  skill, 
  index, 
  totalSkills,
  draggedSkill,
  toggleSkill,
  getSkillPosition,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop
}) => {
  const pos = getSkillPosition(index, totalSkills)
  
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
        transition: draggedSkill ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
}