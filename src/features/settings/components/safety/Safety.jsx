import styles from "./Safety.module.css";

import { useState } from "react";

import { ShieldIconComponent } from "../../../../shared/iconsComponents/ShieldIcon";

import { BoxContainer } from "../../../../shared/ui/BoxContainer/BoxContainer";


export const Safety = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const savePassword = () => {
        if (password === confirmPassword) {
            console.log("Пароль успешно сохранен");
        }
    }

    return (
        <BoxContainer>
            <div className={styles.safetyHeader}>
                <p>Безопасность</p>
                <p>Установите новый пароль для своей учетной записи</p>
            </div>
            <div className={styles.safetyContent}>
                <input
                    type="text"
                    placeholder="Новый пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Подтвердите новый пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className={styles.safeButton} onClick={savePassword}>
                <ShieldIconComponent className={styles.shieldIcon} />
                <p>Сохранить</p>
            </div>
        </BoxContainer>
    )
};
