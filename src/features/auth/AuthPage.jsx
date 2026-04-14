import { Welcome } from './components/welcome/Welcome';
import { PersonalInfoForm } from './components/personalInfoForm/PersonalInfoForm';
import { CareerForm } from './components/careerForm/CareerForm';
import { AccountForm } from "./components/accountForm/AccountForm";

import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './hooks/useOnboarding';
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
    setStep,
    startOnboarding
  } = useOnboarding();

  const navigate = useNavigate();

  const handleComplete = (e) => {
    e.preventDefault();

    if (!formData.career || formData.selectedSkills.length === 0) {
      alert('Заполните все поля');
      return;
    }

    if (onComplete) {
      onComplete(formData);
    }

    updateFormData('career', '');
    updateFormData('selectedSkills', []);
    setCareerInput('');

    navigate('/graph');
  };

  if (step === 'welcome') {
    return (
      <div className="app-container">
        <Welcome
          onStart={() => {
            setStep('personal-info');
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
          onChangeStep={setStep}
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
          onChangeStep={setStep}
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
        //onBack={prevStep}
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
        onChangeStep={setStep}
      />
    </div>
  );
};

export default AuthPage;