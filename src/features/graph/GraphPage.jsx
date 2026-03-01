import { useState } from "react";

import { Graph } from "./components/Graph";
import Card from "./components/Card";

import styles from "./GraphPage.module.css";


export default function GraphPage() {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className={styles.page}>
            { isShow ? <Card /> : null}
            <Card />
            <Graph setIsShow={setIsShow} isShow={isShow}/>
        </div>
    );
}