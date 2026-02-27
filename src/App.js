import React, { useState, useEffect } from 'react';
import professions from './data/professions';
import Circle from './components/Circle';
import ProfessionCard from './components/ProfessionCard';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [studiedProfessions, setStudiedProfessions] = useState([]);

  const handleCircleClick = (profession) => {
    setSelectedProfession(profession);
  };

  const handleStudy = (profession) => {
    if (!studiedProfessions.some(p => p.id === profession.id)) {
      setStudiedProfessions([...studiedProfessions, profession]);
    }
    setSelectedProfession(null);
  };

  const handleClose = () => {
    setSelectedProfession(null);
  };

  // Закрытие по Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSelectedProfession(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="app">
      <h1>Профессии</h1>

      <div className="circles-container">
        {professions.map(prof => (
          <Circle
            key={prof.id}
            profession={prof}
            onClick={handleCircleClick}
          />
        ))}
      </div>

      <ProfessionCard
        profession={selectedProfession}
        onStudy={handleStudy}
        onClose={handleClose}
      />

      <Profile studied={studiedProfessions} />
    </div>
  );
}

export default App;