import styles from "./About.module.css";

import { BoxContainer } from "../../../../shared/ui/BoxContainer/BoxContainer";

export const About = ({ profile }) => {
    return (
        <BoxContainer>
            <p className={styles.aboutTitle}>Обо мне</p>
            <div className={styles.aboutContent}>
                <div className={styles.aboutItems}>
                    <div className={styles.aboutItem}>
                        <p className={styles.itemLabel}>Город</p>
                        <p className={styles.itemValue}>{profile?.city || "Не указан"}</p>
                    </div>
                    <div className={styles.aboutItem}>
                        <p className={styles.itemLabel}>Дата рождения</p>
                        <p className={styles.itemValue}>{profile?.birthDate || "Не указана"}</p>
                    </div>
                </div>
                <div className={styles.textareaBlock}>
                    <p className={styles.itemLabel}>Образование</p>
                    <textarea
                        readOnly
                        className={styles.textarea}
                        value={profile?.educationStatus || "Не указано"}
                    />
                </div>
                <div className={styles.textareaBlock}>
                    <p className={styles.itemLabel}>Карьерная цель</p>
                    <textarea
                        readOnly
                        className={styles.textarea}
                        value={profile?.career || "Не указана"}
                    />
                </div>
                <div className={styles.textareaBlock}>
                    <p className={styles.itemLabel}>Навыки</p>
                    <textarea
                        readOnly
                        className={styles.textarea}
                        value={profile?.selectedSkills?.join(", ") || "Не указаны"}
                    />
                </div>
            </div>
        </BoxContainer>
    );
};
