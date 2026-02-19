import React from 'react'
import { Welcome } from './components/Welcome'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { CareerForm } from './components/CareerForm'
import { useOnboarding } from './hooks/useOnboarding'
import { ThemeToggle } from '../../app/components/ThemeToggle/ThemeToggle'
import styles from './AuthPage.module.css'  

const AuthPage = () => {
console.log('AuthPage styles:', styles)

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
  } = useOnboarding()

  if (step === 'welcome') {
    return (
      <div className="app-container">
        <ThemeToggle />
        <Welcome onStart={startOnboarding} />
      </div>
    )
  }

  if (step === 'personal-info') {
    return (
      <div className="app-container">
        <ThemeToggle />
        <PersonalInfoForm
          formData={formData}
          updateFormData={updateFormData}
          onNext={nextStep}
        />
      </div>
    )
  }

  return (
    <div className="app-container">
      <ThemeToggle />
      <CareerForm
        formData={formData}
        updateFormData={updateFormData}
        onSubmit={handleSubmit}
        loading={loading}
        onBack={prevStep}
      />
    </div>
  )
}

export default AuthPage  