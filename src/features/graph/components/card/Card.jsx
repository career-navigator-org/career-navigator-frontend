import styles from './Card.module.css';
import professions from '../../const/professions';

const Card = ({ profession = professions[0], onStudy, onClose }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{profession.title}</h2>

        <p className={styles.salary}>
          Зарплата: {profession.salaryMin.toLocaleString()} —{' '}
          {profession.salaryMax.toLocaleString()} ₽
        </p>

        <div className={styles.schools}>
          <strong>Где учиться:</strong>
          <ul>
            {profession.schools.map((school, idx) => (
              <li key={idx}>{school}</li>
            ))}
          </ul>
        </div>

        <button
          className={styles['study-btn']}
          onClick={() => onStudy(profession)}
        >
          Изучить
        </button>
      </div>
    </>
  );
};

export default Card;