import styles from "./ProfilePage.module.css";

import { Header } from "./components/header/Header";
import { About } from "./components/about/About";
import { useAuthContext } from "../../app/providers/AuthProvider";

export default function ProfilePage() {
    const { profile, user } = useAuthContext();

    return (
        <div className={styles.profileContainer}>
            <Header profile={profile} user={user} />
            <About profile={profile} />
        </div>
    );
}
