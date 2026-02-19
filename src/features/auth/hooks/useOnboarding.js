import { useState } from 'react'
import { 
  careersDatabase, 
  citiesDatabase, 
  allSkills 
} from '../../../shared/ui/constants'
import { submitOnboardingData } from '../api/authApi'

export const useOnboarding = () => {
  const [step, setStep] = useState('welcome')
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    educationStatus: '',
    city: '',
    career: '',
    selectedSkills: []
  })
  const [skillInput, setSkillInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [careerInput, setCareerInput] = useState('')
  const [loading, setLoading] = useState(false)

  const getCareerSuggestions = () => {
    if (!careerInput.trim()) return []
    const searchTerm = careerInput.toLowerCase()
    return careersDatabase
      .filter(career => career.toLowerCase().includes(searchTerm))
      .slice(0, 5)
  }

  const getCitySuggestions = () => {
    if (!cityInput.trim()) return []
    const searchTerm = cityInput.toLowerCase()
    return citiesDatabase
      .filter(city => city.toLowerCase().includes(searchTerm))
      .slice(0, 5)
  }

  const getSkillSuggestions = () => {
    if (!skillInput.trim()) return []
    const searchTerm = skillInput.toLowerCase()
    return allSkills
      .filter(skill => 
        skill.toLowerCase().includes(searchTerm) && 
        !formData.selectedSkills.includes(skill)
      )
      .slice(0, 5)
  }

  const addSkill = (skill) => {
    if (!formData.selectedSkills.includes(skill)) {
      setFormData({
        ...formData,
        selectedSkills: [...formData.selectedSkills, skill]
      })
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      selectedSkills: formData.selectedSkills.filter(skill => skill !== skillToRemove)
    })
  }

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()
      const suggestions = getSkillSuggestions()
      if (suggestions.length > 0) {
        addSkill(suggestions[0])
      } else {
        addSkill(skillInput.trim())
      }
    }
  }

  const handleCareerSelect = (career) => {
    setFormData({
      ...formData,
      career: career
    })
    setCareerInput('')
  }

  const handleCareerKeyDown = (e) => {
    if (e.key === 'Enter' && careerInput.trim()) {
      e.preventDefault()
      const suggestions = getCareerSuggestions()
      if (suggestions.length > 0) {
        handleCareerSelect(suggestions[0])
      }
    }
  }

  const handleCitySelect = (city) => {
    setFormData({
      ...formData,
      city: city
    })
    setCityInput('')
  }

  const updateFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await submitOnboardingData(formData)
      alert('Спасибо! Данные отправлены')
      
      setFormData({
        fullName: '',
        birthDate: '',
        educationStatus: '',
        city: '',
        career: '',
        selectedSkills: []
      })
      setSkillInput('')
      setCityInput('')
      setCareerInput('')
      
      setStep('welcome')
    } catch (error) {
      alert('Ошибка отправки. Убедись что бэкенд запущен!')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep('main-questions')
  const prevStep = () => setStep('personal-info')
  const startOnboarding = () => setStep('personal-info')

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
  }
}