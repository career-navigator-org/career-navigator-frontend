import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { CareerForm } from './components/CareerForm';
import { useOnboarding } from './hooks/useOnboarding';
import { AccountForm } from "./components/AccountForm";
// import { ThemeToggle } from '../../app/components/ThemeToggle/ThemeToggle'; 
// import styles from './AuthPage.module.css'; 

const AuthPage = ({ onComplete }) => {
  const {
    step,
    formData,
    skillInput, setSkillInput,
    cityInput, setCityInput,
    careerInput, setCareerInput,
    loading,
    getCareerSuggestions,
    getCitySuggestions,
    getSkillSuggestions,
    addSkill,
    removeSkill,
    handleSkillKeyDown,
    handleCareerSelect,
    handleCareerKeyDown,
    handleCitySelect,
    updateFormData,
    handleSubmit,
    nextStep,
    prevStep,
    startOnboarding
  } = useOnboarding();

  const navigate = useNavigate();

  const handleComplete = (e) => {
    e.preventDefault();
    
    if (!formData.career || formData.selectedSkills.length === 0) {
      alert('Заполните все поля');
      return;
    }
    
    console.log('✅ Данные для PDF:', formData);

    if (onComplete) {
      onComplete(formData);
    }

    updateFormData('career', '');
    updateFormData('selectedSkills', []);
    setCareerInput('');

    navigate('/skills');
  };

  if (step === 'welcome') {
    return (
      <div className="app-container">
        <Welcome 
          onStart={() => {
            startOnboarding();
            navigate("/auth?onboarding=true");
          }} 
        />
      </div>
    );
  }

  if (step === 'personal-info') {
    return (
      <div className="app-container">
        {/* <ThemeToggle /> */}
        <PersonalInfoForm
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
        />
      </div>
    );
  }

  if (step === "account") {
  return (
    <div className="app-container">
      <AccountForm
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleComplete}
        loading={loading}
        onBack={prevStep}
      />
    </div>
  );
}

  return (
    <div className="app-container">
      {/* <ThemeToggle /> */}
      <CareerForm
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleComplete}
        loading={loading}
        onBack={prevStep}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        careerInput={careerInput}
        setCareerInput={setCareerInput}
        getCareerSuggestions={getCareerSuggestions}
        getSkillSuggestions={getSkillSuggestions}
        addSkill={addSkill}
        removeSkill={removeSkill}
        handleSkillKeyDown={handleSkillKeyDown}
        handleCareerSelect={handleCareerSelect}
        handleCareerKeyDown={handleCareerKeyDown}
        nextStep={nextStep}
      />
    </div>
  );
};

export default AuthPage;