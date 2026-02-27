import React, { useState } from 'react';
import './Circle.css';

const Circle = ({ profession, onClick }) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    onClick(profession);
    setTimeout(() => setIsBouncing(false), 300);
  };

  return (
    <div
      className={`circle-card ${isBouncing ? 'bounce' : ''}`}
      style={{ backgroundColor: profession.iconColor }}
      onClick={handleClick}
    >
      <div className="title-short">{profession.title}</div>
    </div>
  );
};

export default Circle;