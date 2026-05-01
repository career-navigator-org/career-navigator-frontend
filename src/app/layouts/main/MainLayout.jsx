import { SideBar } from "../../components/SideBar/SideBar";

import { Outlet } from "react-router-dom";

import styles from "./style.module.css";


export default function MainLayout() {
    return (
        <div className={styles.mainContainer}>
            <SideBar />
            <div className={styles.outletContainer}>
                <Outlet />
            </div>
        </div>
    );
}
