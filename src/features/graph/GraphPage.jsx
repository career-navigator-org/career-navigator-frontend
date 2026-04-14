import { useState, useCallback } from "react";
import { Graph } from "./components/graph/Graph";
import Card from "./components/card/Card";
import professions from "./const/professions";

import styles from "./GraphPage.module.css";


export default function GraphPage() {
    const [isShow, setIsShow] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleShowCard = useCallback((show, node = null) => {
        setIsShow(show);

        if (node && node.level === 3) {
            const profession = professions.find(p =>
                p.title.toLowerCase().includes(node.id.toLowerCase())
            );
            setSelectedNode(profession || professions[0]);
        } else {
            setSelectedNode(null);
        }
    }, []);

    const handleCloseCard = useCallback(() => {
        setIsShow(false);
        setSelectedNode(null);
    }, []);

    const handleStudy = useCallback((profession) => {
        console.log('Изучаем профессию:', profession.title);
        handleCloseCard();
    }, [handleCloseCard]);

    return (
        <div className={styles.page}>
            {isShow && selectedNode && (
                <Card
                    profession={selectedNode}
                    onStudy={handleStudy}
                    onClose={handleCloseCard}
                />
            )}
            <Graph
                setIsShow={handleShowCard}
                isShow={isShow}
            />
        </div>
    );
}