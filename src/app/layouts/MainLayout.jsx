import { SideBar } from "../components/SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./style.module.css";

export default function MainLayout() {
  const location = useLocation();

  // Скрываем Sidebar на всех страницах /auth (опросник)
  const hideSidebar = location.pathname.startsWith("/auth");

  return (
    <div className={styles.mainContainer}>
      {!hideSidebar && <SideBar />}
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}