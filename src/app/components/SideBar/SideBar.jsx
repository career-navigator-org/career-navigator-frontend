import { NavLink } from "react-router-dom";

import { useAuthContext } from "../../providers/AuthProvider";
import styles from "./SideBar.module.css";

const NAVLABEL = [
    { title: "Граф", navigateTo: "/graph" },
    { title: "Прогресс", navigateTo: "/progress" },
    { title: "Профиль", navigateTo: "/profile" },
    { title: "Настройки", navigateTo: "/settings" },
];

export const SideBar = () => {
    const { user, profile } = useAuthContext();
    const userName = profile?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
    const userEmail = user?.email || "user@example.com";

    return (
        <aside className={styles.sideBarContainer}>
            <nav className={styles.sideBarNav}>
                {NAVLABEL.map((item) => (
                    <NavLink
                        key={item.navigateTo}
                        to={item.navigateTo}
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.navLabel} ${styles.active}`
                                : styles.navLabel
                        }
                    >
                        {item.title}
                    </NavLink>
                ))}
            </nav>
            <div className={styles.sideBarHeader}>
                <p className={styles.userName}>{userName}</p>
                <p className={styles.userEmail}>{userEmail}</p>
            </div>
        </aside>
    );
};
