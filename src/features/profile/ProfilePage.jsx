import styles from './ProfilePage.module.css';

import { Header } from './components/header/Header';
import { About } from './components/about/About';


export default function ProfilePage() {
    return (
        <div className={styles.profileContainer}>
            <Header />
            <About />
        </div>
    );
}