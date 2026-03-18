import styles from './Welcome.module.css'

export const Welcome = ({ onStart }) => {
  return (
    <div className={styles.welcomeMinimal}>
      <div className={styles.welcomeContent}>
        <h1>Привет</h1>
        <p className={styles.welcomeText}>
          Расскажи о себе и получи свой <br />
          цифровой профиль компетенций
        </p>
        <div className={styles.welcomeBtnWrapper}>
          <button
            onClick={onStart}
            className={styles.welcomeBtn}
          >
            Начать
          </button>
        </div>
      </div>
      <div className={styles.welcomeFooter}>
        <span className={styles.welcomeHint}>3 простых шага</span>
      </div>
    </div>
  )
}