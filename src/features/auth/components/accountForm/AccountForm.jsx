import { useState } from "react";

import styles from "./AccountForm.module.css";

export const AccountForm = ({
  formData,
  updateFormData,
  onSubmit,
  onBack,
  loading,
  error
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = formData.password.length >= 8;
  const isConfirmValid = confirmPassword === formData.password;
  const isValid =
    formData.email &&
    isPasswordValid &&
    confirmPassword &&
    isConfirmValid;

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles.questionsMinimal}>
      <div className={styles.questionsHeader}>
        <span className={styles.questionsStep}>Шаг 3 из 3</span>
        <h2>Создание аккаунта</h2>
        <button onClick={onBack} className={styles.backBtn}>Назад</button>
      </div>

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

      <div className={styles.questionBlock}>
        <label className={styles.questionLabel}>Пароль и подтверждение</label>

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            placeholder="Пароль (мин. 8 символов)"
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

        <div className={styles.passwordErrors}>
          {!isPasswordValid && formData.password.length > 0 && (
            <div>Пароль должен быть не менее 8 символов</div>
          )}
          {!isConfirmValid && confirmPassword.length > 0 && (
            <div>Пароли не совпадают</div>
          )}
          {error && <div>{error}</div>}
        </div>
      </div>

      <div className={styles.questionsFooter}>
        <button
          onClick={onSubmit}
          disabled={!isValid || loading}
          className={styles.submitQuestionsBtn}
        >
          {loading ? "Создание..." : "Создать аккаунт"}
        </button>
      </div>
    </div>
  );
};
