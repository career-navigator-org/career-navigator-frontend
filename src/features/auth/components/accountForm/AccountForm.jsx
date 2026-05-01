import { useState } from "react";
import { data, useNavigate } from "react-router-dom";

import styles from "./AccountForm.module.css";

import { useOnboarding } from "../../hooks/useOnboarding";


export const AccountForm = ({
  formData,
  updateFormData,
  loading,
  onBack
}) => {
  const { setCareerInput } = useOnboarding();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const isPasswordValid = formData?.password?.length >= 6;
  const isConfirmValid = confirmPassword === formData?.password;
  const isValid =
    formData?.email &&
    isPasswordValid &&
    confirmPassword &&
    isConfirmValid;

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!formData.career || formData.selectedSkills.length === 0) {
      alert('Заполните все поля');
      return;
    }

    try {
      const checkServerHealth = async () => {
        try {
          const response = await fetch('http://155.212.217.53:8081/auth/ping');

          if (!response.ok) return false;

          const data = await response.text();
          return data.trim().toLowerCase() === 'pong';
        } catch (error) {
          console.error("Сервер недоступен (Health Check failed)", error);
          return false;
        }
      };

      // const response = await fetch('/auth/sign-up', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     firstName: "Ivan",
      //     lastName: "Ivanov",
      //     email: "geo.proleev@gmail.com",
      //     password: "12345678"
      //   })
      // });

      // if (!response.ok) {
      //   const errorData = await response.json().catch(() => ({}));
      //   throw new Error(errorData.message || `Ошибка: ${response.status}`);
      // }

      // const result = await response.json();
      //navigate('/graph')
      checkServerHealth();
      console.log("Успешная регистрация:", data);

      updateFormData('career', '');
      updateFormData('selectedSkills', []);
      setCareerInput('');

    } catch (error) {
      console.error("Ошибка при запросе:", error);
      alert(`Не удалось отправить данные: ${error.message}`);
    }
  };

  return (
    <div>
      <div className={styles.questionsHeader}>
        <span className={styles.questionsStep}>Шаг 3 из 3</span>
        <h2>Создание аккаунта</h2>
        <button onClick={onBack} className={styles.backBtn}>Назад</button>
      </div>

      {/* Email */}
      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Введите email"
          className={styles.textInput}
        />
      </div>

      {/* Пароль + Подтверждение в одном блоке */}
      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Пароль и подтверждение</label>

        {/* Пароль */}
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            placeholder="Пароль (мин. 6 символов)"
            className={styles.textInput}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.showPasswordBtn}
          >
            {showPassword ? "Скрыть" : "Показать"}
          </button>
        </div>

        {/* Подтверждение */}
        <div className={styles.passwordWrapper} style={{ marginTop: "10px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            className={styles.textInput}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={styles.showPasswordBtn}
          >
            {showPassword ? "Скрыть" : "Показать"}
          </button>
        </div>

        {/* Сообщения об ошибках */}
        <div className={styles.passwordErrors}>
          {/* {!isPasswordValid && formData?.password.length > 0 && (
            <div>Пароль должен быть не менее 6 символов</div>
          )} */}
          {!isConfirmValid && confirmPassword.length > 0 && (
            <div>Пароли не совпадают</div>
          )}
        </div>
      </div>

      {/* Кнопка далее */}
      <div className={styles.questionsFooter}>
        <button
          onClick={handleAuth}
          disabled={!isValid || loading}
          className={styles.submitQuestionsBtn}
        >
          {loading ? "Создание..." : "Создать аккаунт"}
        </button>
      </div>
    </div >
  );
};