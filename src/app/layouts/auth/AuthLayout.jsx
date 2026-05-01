import { SideBar } from "../../components/SideBar/SideBar";

import { Outlet } from "react-router-dom";

import styles from "./style.module.css";


export default function AuthLayout() {
    return (
        <div className={styles.mainContainer}>
            <Outlet />
        </div>
    )
};
