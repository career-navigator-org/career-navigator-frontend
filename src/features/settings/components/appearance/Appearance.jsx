import styles from "./Appearance.module.css";

import { useState } from "react";
import { useTheme } from "../../../../app/providers/ThemeProvider";

import { MoonIconComponent } from '../../../../shared/iconsComponents/MoonIcon';
import { PlanetIconComponent } from '../../../../shared/iconsComponents/PlanetIcon';

import { BoxContainer } from '../../../../shared/ui/BoxContainer/BoxContainer';
import { DropdownMenu } from "../../../../shared/ui/DropdownMenu/DropdownMenu";


const THEME_OPTIONS = [
    { value: "light", label: "Светлая" },
    { value: "dark", label: "Тёмная" },
    { value: "system", label: "Системная" }
];

const LANGUAGE_OPTIONS = [
    { value: "ru", label: "Русский" },
    { value: "kz", label: "Казахский" }
]


export const Appearance = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);
    const { theme, setTheme } = useTheme();

    const selectedTheme = THEME_OPTIONS.find(t => t.value === theme);

    return (
        <BoxContainer>
            <div className={styles.appearanceHeader}>
                <p>Внешний вид и язык</p>
                <p>Настройте ваш интерфейс</p>
            </div>
            <div className={styles.settingsSections}>
                <div className={styles.themeSection}>
                    <div className={styles.themeContainer}>
                        <div className={styles.moonIconContainer}>
                            <MoonIconComponent className={styles.moonIcon} />
                        </div>
                        <div className={styles.themeText}>
                            <p>Темная тема</p>
                            <p>Выберите тему</p>
                        </div>
                    </div>
                    <DropdownMenu
                        dropdownItems={THEME_OPTIONS}
                        selectedItem={selectedTheme}
                        setSelectedItem={(item) => setTheme(item.value)}
                    />
                </div>
                <div className={styles.languageSection}>
                    <div className={styles.languageContainer}>
                        <div className={styles.planetIconContainer}>
                            <PlanetIconComponent className={styles.planetIcon} />
                        </div>
                        <div className={styles.languageText}>
                            <p>Язык</p>
                            <p>Выберите предпочитаемый вами язык</p>
                        </div>
                    </div>
                    <DropdownMenu
                        dropdownItems={LANGUAGE_OPTIONS}
                        selectedItem={selectedLanguage}
                        setSelectedItem={setSelectedLanguage}
                    />
                </div>
            </div>
        </BoxContainer>
    )
};
