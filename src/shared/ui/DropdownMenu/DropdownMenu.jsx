import { useState, useRef, useEffect } from "react";

import styles from "./DropdownMenu.module.css";

import { CaretIconComponent } from "../../iconsComponents/CaretIcon";


export const DropdownMenu = ({ dropdownItems, selectedItem, setSelectedItem }) => {
    const container = useRef();

    const [dropdownState, setDropdownState] = useState({ open: false });
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setDropdownState({ open: !dropdownState.open });
        setIsOpen((v) => !v);
    };

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownState({ open: false });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={container}>
            <button
                type="button"
                className={styles.button}
                onClick={handleDropdownClick}
            >
                {selectedItem}
                <CaretIconComponent className={`${styles.chevron} ${isOpen ? styles.open : ""}`} />
            </button>
            {dropdownState.open && (
                <div className={`${styles.dropdownContainer} ${styles.dropdownOpen}`}>
                    {dropdownItems?.map((item, index) => (
                        <div
                            onClick={() => {
                                setSelectedItem(dropdownItems[index].title)
                                setDropdownState({ open: false });
                            }}
                            key={index}
                        >{item.title}</div>
                    ))}
                </div>
            )}
        </div>
    );
}