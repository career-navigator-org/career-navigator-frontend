import { useState } from 'react';
import { 
  careersDatabase, 
  citiesDatabase, 
  allSkills 
} from '../../../shared/ui/constants';

export const useOnboarding = () => {
  // Шаги: welcome → personal-info → career → account
  const [step, setStep] = useState('welcome');

  // Данные формы с новыми полями email и password
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    educationStatus: '',
    city: '',
    career: '',
    selectedSkills: [],
    email: '',
    password: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [careerInput, setCareerInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Подсказки для карьер, городов и навыков
  const getCareerSuggestions = () => {
    if (!careerInput.trim()) return [];
    const searchTerm = careerInput.toLowerCase();
    return careersDatabase
      .filter(career => career.toLowerCase().includes(searchTerm))
      .slice(0, 5);
  };

  const getCitySuggestions = () => {
    if (!cityInput.trim()) return [];
    const searchTerm = cityInput.toLowerCase();
    return citiesDatabase
      .filter(city => city.toLowerCase().includes(searchTerm))
      .slice(0, 5);
  };

  const getSkillSuggestions = () => {
    if (!skillInput.trim()) return [];
    const searchTerm = skillInput.toLowerCase();
    return allSkills
      .filter(skill => 
        skill.toLowerCase().includes(searchTerm) && 
        !formData.selectedSkills.includes(skill)
      )
      .slice(0, 5);
  };

  // Управление навыками
  const addSkill = (skill) => {
    if (!formData.selectedSkills.includes(skill)) {
      setFormData({
        ...formData,
        selectedSkills: [...formData.selectedSkills, skill]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      selectedSkills: formData.selectedSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const suggestions = getSkillSuggestions();
      if (suggestions.length > 0) {
        addSkill(suggestions[0]);
      } else {
        addSkill(skillInput.trim());
      }
    }
  };

  // Карьера
  const handleCareerSelect = (career) => {
    setFormData({ ...formData, career });
    setCareerInput('');
  };

  const handleCareerKeyDown = (e) => {
    if (e.key === 'Enter' && careerInput.trim()) {
      e.preventDefault();
      const suggestions = getCareerSuggestions();
      if (suggestions.length > 0) {
        handleCareerSelect(suggestions[0]);
      }
    }
  };

  // Город
  const handleCitySelect = (city) => {
    setFormData({ ...formData, city });
    setCityInput('');
  };

  // Обновление данных формы
  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Данные формы:', formData);
    return 'success';
  };

  // Навигация по шагам с новым шагом account
  const nextStep = () => {
    if (step === 'welcome') setStep('personal-info');
    else if (step === 'personal-info') setStep('career');
    else if (step === 'career') setStep('account');
  };

  const prevStep = () => {
    if (step === 'account') setStep('career');
    else if (step === 'career') setStep('personal-info');
    else if (step === 'personal-info') setStep('welcome');
  };

  const startOnboarding = () => setStep('personal-info');

  return {
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
  };
};