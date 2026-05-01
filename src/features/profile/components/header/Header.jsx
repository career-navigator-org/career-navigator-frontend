import styles from "./Header.module.css";

import { BoxContainer } from "../../../../shared/ui/BoxContainer/BoxContainer";
import { MailIconComponent } from "../../../../shared/iconsComponents/MailIcon";

const getInitial = (profile, user) => {
    const source = profile?.fullName || user?.firstName || user?.email || "U";
    return source[0]?.toUpperCase() || "U";
};

export const Header = ({ profile, user }) => {
    const fullName = profile?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";

    return (
        <BoxContainer>
            <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>{getInitial(profile, user)}</div>
                <div className={styles.profileInfo}>
                    <p className={styles.profileName}>{fullName}</p>
                    <div className={styles.profileEmail}>
                        <MailIconComponent className={styles.mailIcon} />
                        <p>{user?.email || "user@example.com"}</p>
                    </div>
                </div>
            </div>
        </BoxContainer>
    );
};
