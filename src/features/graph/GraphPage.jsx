import { useState, useCallback } from "react";

import { Graph } from "./components/Graph";
import Card from "./components/Card";

import styles from "./GraphPage.module.css";


export default function GraphPage() {
    const [isShow, setIsShow] = useState(false);

    // Оберни setter в useCallback
    const handleShowCard = useCallback((show) => {
        setIsShow(show);
    }, []);

    return (
        <div className={styles.page}>
            { isShow ? <Card/> : null}
            <Graph setIsShow={handleShowCard} isShow={isShow}/>
        </div>
    );
}