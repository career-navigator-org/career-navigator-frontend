import React from 'react'
import styles from '../AuthPage.module.css'

export const Welcome = ({ onStart }) => {
  console.log('Styles:', styles) 
  
  return (
    <div className={styles.welcomeMinimal}>
      <div className={styles.welcomeContent}>
        <h1>
          <span className={styles.welcomeGreeting}>Привет</span>
          <span className={styles.welcomeEmoji}>👋</span>
        </h1>
        <p className={styles.welcomeText}>
          Расскажи о себе и получи свой <br />
          цифровой профиль компетенций
        </p>
        <button 
          onClick={onStart}
          className={styles.welcomeBtn}
        >
          Начать
        </button>
      </div>
      <div className={styles.welcomeFooter}>
        <span className={styles.welcomeHint}>2 простых шага</span>
      </div>
    </div>
  )
}