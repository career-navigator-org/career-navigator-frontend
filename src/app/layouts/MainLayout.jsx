import { SideBar } from "../components/SideBar";

import { Outlet } from "react-router-dom";

import "./style.module.css";


export default function MainLayout() {
    return (
        <>
            <main className="mainContainer">
                <SideBar />
                <Outlet />
            </main>
        </>
    );
};
