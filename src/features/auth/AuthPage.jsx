import { Welcome } from './components/welcome/Welcome';
import { PersonalInfoForm } from './components/personalInfoForm/PersonalInfoForm';
import { CareerForm } from './components/careerForm/CareerForm';
import { AccountForm } from "./components/accountForm/AccountForm";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from './hooks/useOnboarding';

import styles from "./AuthPage.module.css"

const AuthPage = () => {
  const {
    formData,
    skillInput,
    setSkillInput,
    cityInput,
    setCityInput,
    careerInput,
    setCareerInput,
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
    handleSubmit
  } = useOnboarding();

  const [step, setStep] = useState('welcome');

  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      {step === "welcome" && <Welcome
        onStart={() => {
          setStep('personal-info');
          navigate("/auth?onboarding=true");
        }}
      />}
      {step === "personal-info" && <PersonalInfoForm
        formData={formData}
        updateFormData={updateFormData}
        onChangeStep={() => setStep("career")}
      />}
      {step === "account" && <AccountForm
        formData={formData}
        updateFormData={updateFormData}
        loading={loading}
        onChangeStep={() => navigate("/graph")}
        onBack={() => setStep("career")}
      />}
      {step === "career" && <CareerForm
        formData={formData}
        updateFormData={updateFormData}
        loading={loading}
        onBack={() => setStep("personal-info")}
        onChangeStep={() => setStep("account")}
      />}
    </div>
  );
};

export default AuthPage;