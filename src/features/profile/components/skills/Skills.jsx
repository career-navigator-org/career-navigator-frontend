import styles from './Skills.module.css';

import { BoxContainer } from '../../../../shared/ui/BoxContainer/BoxContainer';


const LEARNED_SKILLS = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Django', 'SQL', 'Git', 'Docker'];
const NEEDED_SKILLS = ['TypeScript', 'GraphQL', 'AWS', 'Kubernetes', 'Go', 'Rust', 'Flutter', 'Swift', 'Kotlin']


export const Skills = () => {
    return (
        <BoxContainer>
            <p className={styles.skillsTitle}>Прогресс обучения</p>
            <div className={styles.skillsContainer}>
                <p>Что изучено</p>
                <div className={styles.skillsList}>
                    {LEARNED_SKILLS.map((skill, index) => (
                        <div key={index} className={styles.learnedSkill}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.skillsContainer}>
                <p>Что надо изучить</p>
                <div className={styles.skillsList}>
                    {NEEDED_SKILLS.map((skill, index) => (
                        <div key={index} className={styles.neededSkill}>
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </BoxContainer>
    )
};
