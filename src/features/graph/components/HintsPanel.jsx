import React from 'react'
import styles from '../GraphPage.module.css'

export const HintsPanel = () => {
  return (
    <div className={styles.hintsPanel}>
      <div className={styles.hintItem}>
        <span className={styles.hintDot}></span>
        <span>Кликни чтобы отметить</span>
      </div>
      <div className={styles.hintItem}>
        <span className={styles.hintDot}></span>
        <span>Перетащи чтобы изменить порядок</span>
      </div>
    </div>
  )
}