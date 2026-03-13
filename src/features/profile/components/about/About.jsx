import styles from "./About.module.css";
import { BoxContainer } from "../../../../shared/ui/BoxContainer/BoxContainer";

export const About = () => {
    return (
        <BoxContainer>
            <p className={styles.aboutTitle}>Обо мне</p>
            <div className={styles.aboutContent}>
                <div className={styles.aboutItems}>
                    <div className={styles.aboutItem}>
                        <p className={styles.itemLabel}>Место учёбы</p>
                        <p className={styles.itemValue}>Алабуга Политех</p>
                    </div>
                    <div className={styles.aboutItem}>
                        <p className={styles.itemLabel}>Место работы</p>
                        <p className={styles.itemValue}>Алабуга Политех</p>
                    </div>
                </div>
                <div className={styles.textareaBlock}>
                    <p className={styles.itemLabel}>Образование</p>
                    <textarea
                        className={styles.textarea}
                        placeholder="Опишите свое образование, полученные сертификаты, пройденные курсы..."
                    />
                </div>
                <div className={styles.textareaBlock}>
                    <p className={styles.itemLabel}>Карьера</p>
                    <textarea
                        className={styles.textarea}
                        placeholder="Опишите свой карьерный путь, опыт работы, достижения..."
                    />
                </div>
            </div>
        </BoxContainer>
    );
};