import styles from './BoxContainer.module.css';


export const BoxContainer = ({ children }) => {
    return (
        <div className={styles.box}>
            {children}
        </div>
    )
};
