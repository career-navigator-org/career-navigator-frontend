import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import styles from './ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { darkMode, toggleTheme, isAnimating, clickPosition } = useTheme()
  
  return (
    <>
      {isAnimating && (
        <div 
          className={styles.themeRipple}
          style={{
            left: clickPosition.x,
            top: clickPosition.y,
          }}
        />
      )}
      <button 
        onClick={toggleTheme} 
        className={styles.themeToggle}
        aria-label="Переключить тему"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </>
  )
}