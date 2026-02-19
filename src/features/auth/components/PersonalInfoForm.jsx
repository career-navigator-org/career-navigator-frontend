import React, { useState } from 'react'
import { educationOptions, citiesDatabase } from '../../../shared/ui/constants'
import styles from '../AuthPage.module.css'

export const PersonalInfoForm = ({ formData, updateFormData, onNext }) => {
  const [cityInput, setCityInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const getCitySuggestions = () => {
    if (!cityInput.trim()) return []
    const searchTerm = cityInput.toLowerCase()
    return citiesDatabase
      .filter(city => city.toLowerCase().includes(searchTerm))
      .slice(0, 5)
  }

  const handleCitySelect = (city) => {
    updateFormData('city', city)
    setCityInput('')
    setShowSuggestions(false)
  }

  const suggestions = getCitySuggestions()

  return (
    <div className={styles.questionsMinimal}>
      <div className={styles.questionsHeader}>
        <span className={styles.questionsStep}>Шаг 1 из 2</span>
        <h2>Основная информация</h2>
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Как тебя зовут?</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          placeholder="Введите ФИО"
          className={styles.textInput}
        />
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Дата рождения</label>
        <input
          type="date"
          value={formData.birthDate}
          onChange={(e) => updateFormData('birthDate', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          min="1900-01-01"
          className={styles.textInput}
        />
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Твой текущий статус</label>
        <div className={styles.optionsGrid}>
          {educationOptions.map((option) => (
            <button
              key={option}
              onClick={() => updateFormData('educationStatus', option)}
              className={`${styles.optionPill} ${formData.educationStatus === option ? styles.selected : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Город проживания</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => {
              setCityInput(e.target.value)
              setShowSuggestions(true)
              if (!e.target.value) {
                updateFormData('city', '')
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Начните вводить город..."
            className={styles.textInput}
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div className={styles.suggestionsDropdown}>
              {suggestions.map(city => (
                <div
                  key={city}
                  onMouseDown={() => handleCitySelect(city)}
                  className={styles.suggestionItem}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        {formData.city && (
          <div className={styles.selectedValue}>
            Выбран: <strong>{formData.city}</strong>
          </div>
        )}
      </div>

      <div className={styles.questionsFooter}>
        <button
          onClick={onNext}
          disabled={!formData.fullName || !formData.birthDate || !formData.educationStatus || !formData.city}
          className={styles.submitQuestionsBtn}
        >
          Далее
        </button>
      </div>
    </div>
  )
}