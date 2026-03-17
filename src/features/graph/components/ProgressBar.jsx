import React from 'react'
import styles from '../GraphPage.module.css'

export const ProgressBar = ({ completedSkills, totalSkills, progressPercentage }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Освоено</span>
          <span className={styles.statValue}>{completedSkills}</span>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Всего</span>
          <span className={styles.statValue}>{totalSkills}</span>
        </div>
      </div>
      
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className={styles.progressTooltip}>
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
    </div>
  )
}