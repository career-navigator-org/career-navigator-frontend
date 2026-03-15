import { useMemo, useState, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData } from "../const/graphData";

// Цвета по заданию
const LEVEL_COLORS = {
    0: { node: '#FF3B3B', border: '#D32F2F' },  
    1: { node: '#4CAF50', border: '#388E3C' },     
    2: { node: '#9E9E9E', border: '#757575' },    
    3: { node: '#2196F3', border: '#1976D2' }
};
    const lerpColor = (a, b, t) => {
    const c1 = parseInt(a.slice(1), 16);
    const c2 = parseInt(b.slice(1), 16);

    const r = Math.round(((c2 >> 16) - (c1 >> 16)) * t + (c1 >> 16));
    const g = Math.round(
        (((c2 >> 8) & 0xff) - ((c1 >> 8) & 0xff)) * t +
        ((c1 >> 8) & 0xff)
    );
    const bCol = Math.round(((c2 & 0xff) - (c1 & 0xff)) * t + (c1 & 0xff));

    return `rgb(${r},${g},${bCol})`;
};

const BASE_COLORS = {
    node: "#F2F4F8",
    border: "#E6E9F2",
};

const ACTIVE_COLORS = {
    inner: "#8186f1",
    outer: "#F6F7FB",
};

export const Graph = ({setIsShow, isShow}) => {
    const fgRef = useRef();
    const [hoverNode, setHoverNode] = useState(null);
    const data = useMemo(() => graphData, []);

    useEffect(() => {
        if (fgRef.current) {
            setTimeout(() => {
                fgRef.current.zoom(1.8, 800);
            }, 100);
        }
    }, []);

    return (
        <ForceGraph2D
            ref={fgRef}
            graphData={data}
            backgroundColor="#ffffff"
            linkDirectionalParticles={0}
            onNodeHover={(node) => {
                setHoverNode(node);
                if (fgRef.current) {
                    fgRef.current.d3ReheatSimulation();
                }
            }}
            onNodeClick={(node) => {
                fgRef.current.centerAt(node.x, node.y, 800);
                fgRef.current.zoom(3, 800);
                setIsShow(true, node);
            }}
            linkColor={(link) => {
                if (!hoverNode) return "#E0E0E0";

                const isConnected =
                    link.source === hoverNode ||
                    link.target === hoverNode;

                return isConnected
                    ? "#9E9E9E"
                    : "#E0E0E0";
            }}
            linkWidth={(link) => {
                if (!hoverNode) return 1;

                const isConnected =
                    link.source === hoverNode ||
                    link.target === hoverNode;

                return isConnected ? 2 : 1;
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
                // Размер узла
                const size = node.level === 0 ? 12 : 8;
                
                // Получаем цвета по уровню
                const levelColor = LEVEL_COLORS[node.level] || LEVEL_COLORS[2];
                
                // Если узел наведен - делаем ярче
                const isActive = node === hoverNode;
                
                // Основной цвет узла
                const nodeColor = isActive 
                    ? levelColor.border
                    : levelColor.node;

                if (isActive) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size + 3, 0, 2 * Math.PI);
                    ctx.fillStyle = levelColor.border + '33'; 
                    ctx.fill();
                }

                // Основной круг
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                ctx.fillStyle = nodeColor;
                ctx.fill();

                // Белая обводка для всех узлов
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Glow при наведении
                if (isActive) {
                    ctx.shadowColor = levelColor.border;
                    ctx.shadowBlur = 20;
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                    ctx.fillStyle = nodeColor;
                    ctx.fill();
                    
                    ctx.shadowBlur = 0;
                }

                // Подпись
                const fontSize = 12 / globalScale;
                ctx.font = `500 ${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = isActive ? '#000000' : '#666666';
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(
                    node.id,
                    node.x,
                    node.y + size + 8
                );
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI);
                ctx.fill();
            }}
        />
    );
};