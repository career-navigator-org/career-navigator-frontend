import React, { useState } from 'react'
import { careersDatabase, allSkills } from '../../../shared/ui/constants'
import styles from '../AuthPage.module.css'

export const CareerForm = ({ 
  formData, 
  updateFormData, 
  onSubmit, 
  loading,
  onBack 
}) => {
  const [skillInput, setSkillInput] = useState('')
  const [careerInput, setCareerInput] = useState('')
  const [showCareerSuggestions, setShowCareerSuggestions] = useState(false)
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false)

  const getCareerSuggestions = () => {
    if (!careerInput.trim()) return []
    const searchTerm = careerInput.toLowerCase()
    return careersDatabase
      .filter(career => career.toLowerCase().includes(searchTerm))
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
      updateFormData('selectedSkills', [...formData.selectedSkills, skill])
      setSkillInput('')
    }
  }

  const removeSkill = (skillToRemove) => {
    updateFormData(
      'selectedSkills', 
      formData.selectedSkills.filter(skill => skill !== skillToRemove)
    )
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
    updateFormData('career', career)
    setCareerInput('')
    setShowCareerSuggestions(false)
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

  const careerSuggestions = getCareerSuggestions()
  const skillSuggestions = getSkillSuggestions()

  return (
    <div className={styles.questionsMinimal}>
      <div className={styles.questionsHeader}>
        <span className={styles.questionsStep}>Шаг 2 из 2</span>
        <h2>Карьера и навыки</h2>
        <button onClick={onBack} className={styles.backBtn}>← Назад</button>
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Какие профессии рассматриваешь?</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={careerInput}
            onChange={(e) => {
              setCareerInput(e.target.value)
              setShowCareerSuggestions(true)
              if (!e.target.value) {
                updateFormData('career', '')
              }
            }}
            onKeyDown={handleCareerKeyDown}
            onBlur={() => setTimeout(() => setShowCareerSuggestions(false), 200)}
            placeholder="Начните вводить профессию..."
            className={styles.textInput}
          />
          
          {showCareerSuggestions && careerSuggestions.length > 0 && (
            <div className={styles.suggestionsDropdown}>
              {careerSuggestions.map(career => (
                <div
                  key={career}
                  onMouseDown={() => handleCareerSelect(career)}
                  className={styles.suggestionItem}
                >
                  {career}
                </div>
              ))}
            </div>
          )}
        </div>
        {formData.career && (
          <div className={styles.selectedValue}>
            Выбрано: <strong>{formData.career}</strong>
          </div>
        )}
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Что ты уже знаешь и умеешь?</label>
        
        {formData.selectedSkills.length > 0 && (
          <div className={styles.selectedSkills}>
            {formData.selectedSkills.map(skill => (
              <span key={skill} className={styles.skillTag}>
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className={styles.removeSkill}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => {
              setSkillInput(e.target.value)
              setShowSkillSuggestions(true)
            }}
            onKeyDown={handleSkillKeyDown}
            onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 200)}
            placeholder="Начни вводить навык или технологию..."
            className={styles.skillsInput}
          />
          
          {showSkillSuggestions && skillSuggestions.length > 0 && (
            <div className={styles.suggestionsDropdown}>
              {skillSuggestions.map(skill => (
                <div
                  key={skill}
                  onMouseDown={() => addSkill(skill)}
                  className={styles.suggestionItem}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.popularSkills}>
          <span className={styles.popularLabel}>Популярное:</span>
          {['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'SQL', 'Git'].map(skill => (
            !formData.selectedSkills.includes(skill) && (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className={styles.popularSkill}
              >
                + {skill}
              </button>
            )
          ))}
        </div>
      </div>

      <div className={styles.questionsFooter}>
        <button
          onClick={onSubmit}
          disabled={!formData.career || formData.selectedSkills.length === 0 || loading}
          className={styles.submitQuestionsBtn}
        >
          {loading ? 'Отправка...' : 'Завершить'}
        </button>
      </div>
    </div>
  )
}