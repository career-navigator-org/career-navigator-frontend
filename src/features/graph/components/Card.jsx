import React from 'react';
import styles from './Card.module.css';  // Импортируем как styles
import professions from './professions';

const Card = ({ profession = professions[0], onStudy, onClose }) => {
  return (
    <>
      {/* Overlay - используем styles.overlay */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* Modal - используем styles.card */}
      <div className={styles.card}>
        <h2>{profession.title}</h2>

        <p className={styles.salary}>  {/* И здесь styles.salary */}
          Зарплата: {profession.salaryMin.toLocaleString()} —{' '}
          {profession.salaryMax.toLocaleString()} ₽
        </p>

        <div className={styles.schools}>  {/* И здесь styles.schools */}
          <strong>Где учиться:</strong>
          <ul>
            {profession.schools.map((school, idx) => (
              <li key={idx}>{school}</li>
            ))}
          </ul>
        </div>

        <button
          className={styles['study-btn']}  // Для дефиса используем квадратные скобки
          onClick={() => onStudy(profession)}
        >
          Изучить
        </button>
      </div>
    </>
  );
};

export default Card;