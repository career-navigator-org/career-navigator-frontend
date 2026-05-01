import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Welcome } from "./components/welcome/Welcome";
import { PersonalInfoForm } from "./components/personalInfoForm/PersonalInfoForm";
import { CareerForm } from "./components/careerForm/CareerForm";
import { AccountForm } from "./components/accountForm/AccountForm";
import { useOnboarding } from "./hooks/useOnboarding";
import { saveOnboardingProfile } from "./api/authApi";
import { useAuthContext } from "../../app/providers/AuthProvider";

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "User",
    lastName: parts.slice(1).join(" ") || "User"
  };
};

const AuthPage = () => {
  const {
    step,
    formData,
    loading,
    setLoading,
    updateFormData,
    nextStep,
    prevStep,
    startOnboarding
  } = useOnboarding();
  const { register, login, refreshAuth, setProfile } = useAuthContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleComplete = async (e) => {
    e.preventDefault();

    if (!formData.career || formData.selectedSkills.length === 0) {
      setError("Заполните все поля анкеты.");
      return;
    }

    const { firstName, lastName } = splitFullName(formData.fullName);

    try {
      setError("");
      setLoading(true);

      await register({
        firstName,
        lastName,
        email: formData.email,
        password: formData.password
      });

      await login(formData.email, formData.password);

      const savedProfile = await saveOnboardingProfile({
        fullName: formData.fullName,
        birthDate: formData.birthDate,
        educationStatus: formData.educationStatus,
        city: formData.city,
        career: formData.career,
        selectedSkills: formData.selectedSkills
      });

      setProfile(savedProfile);
      await refreshAuth();
      navigate("/profile");
    } catch (submitError) {
      setError(submitError.message || "Не удалось создать аккаунт.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "welcome") {
    return (
      <div className="app-container">
        <Welcome
          onStart={() => {
            startOnboarding();
            navigate("/auth");
          }}
        />
      </div>
    );
  }

  if (step === "personal-info") {
    return (
      <div className="app-container">
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
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="app-container">
      <CareerForm
        formData={formData}
        updateFormData={updateFormData}
        loading={loading}
        onBack={prevStep}
        nextStep={nextStep}
      />
    </div>
  );
};

export default AuthPage;
