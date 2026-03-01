import React from 'react';
import './Card.module.css';

const Card = ({ profession, onStudy, onClose }) => {
  if (!profession) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={onClose}></div>

      {/* Modal */}
      <div className="card">
        <h2>{profession.title}</h2>

        <p className="salary">
          Зарплата: {profession.salaryMin.toLocaleString()} —{' '}
          {profession.salaryMax.toLocaleString()} ₽
        </p>

        <div className="schools">
          <strong>Где учиться:</strong>
          <ul>
            {profession.schools.map((school, idx) => (
              <li key={idx}>{school}</li>
            ))}
          </ul>
        </div>

        <button
          className="study-btn"
          onClick={() => onStudy(profession)}
        >
          Изучить
        </button>
      </div>
    </>
  );
};

export default Card;