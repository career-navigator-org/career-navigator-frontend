import styles from './DangerZone.module.css';

import { LogoutIconComponent } from '../../../../shared/iconsComponents/LogoutIcon';

import { BoxContainer } from '../../../../shared/ui/BoxContainer/BoxContainer';


export const DangerZone = () => {
    return (
        <BoxContainer>
            <div className={styles.dangerHeader}>
                <p>Опасная зона</p>
                <p>Будте осторожны</p>
            </div>
            <div className={styles.section}>
                <div className={styles.dangerContainer}>
                    <div className={styles.logoutIconContainer}>
                        <LogoutIconComponent className={styles.icon} />
                    </div>
                    <div className={styles.logoutText}>
                        <p>Выход</p>
                        <p>Покинуть платформу ненадолго…</p>
                    </div>
                </div>
                <div className={styles.logoutButton}>Выйти</div>
            </div>
        </BoxContainer>
    )
};
