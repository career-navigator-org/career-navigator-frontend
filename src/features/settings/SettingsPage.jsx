import styles from './SettingsPage.module.css';

import { Appearance } from './components/appearance/Appearance';
import { DangerZone } from './components/dangerZone/DangerZone';
import { Safety } from './components/safety/Safety';


export default function SettingsPage() {
    return (
        <div className={styles.settingsContainer}>
            <Appearance />
            <Safety />
            <DangerZone />
        </div>
    )
};
