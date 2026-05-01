import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";

const NAVLABEL = [
    { title: "Граф", navigateTo: "/graph" },
    { title: "Профиль", navigateTo: "/profile" },
    { title: "Настройки", navigateTo: "/settings" },
];

export const SideBar = () => {
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
                <p className={styles.userName}>Yuma</p>
                <p className={styles.userEmail}>ecppr@gmail.com</p>
            </div>
        </aside>
    );
};