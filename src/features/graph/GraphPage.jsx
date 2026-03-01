import { Graph } from "./components/Graph";

import styles from "./GraphPage.module.css";


export default function GraphPage() {

    return (
        <div className={styles.page}>
            <Graph />
        </div>
    );
}