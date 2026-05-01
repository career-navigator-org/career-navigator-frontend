import styles from './Header.module.css';

import { BoxContainer } from '../../../../shared/ui/BoxContainer/BoxContainer';
import { MailIconComponent } from '../../../../shared/iconsComponents/MailIcon';


export const Header = () => {
    return (
        <BoxContainer>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>Y</div>
                <div className={styles.profileInfo}>
                    <p className={styles.profileName}>Yuma</p>
                    <div className={styles.profileEmail}>
                        <MailIconComponent className={styles.mailIcon} />
                        <p>ecppr@gmail.com</p>
                    </div>
                </div>
            </div>
        </BoxContainer>
    )
};
