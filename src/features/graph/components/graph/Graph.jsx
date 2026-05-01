import { useMemo, useState, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

import { useUserGraph } from "../../hooks/useUserGraph";


const LEVEL_COLORS = {
    0: { node: '#9a9dec', border: '#6165dc' },
    1: { node: '#50cd97', border: '#00C26E' },
    2: { node: '#ECECEC', border: '#8D90A1' },
    3: { node: '#2196F3', border: '#1976D2' }
};

function lighten(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.min(255, (num >> 16) + 255 * percent);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + 255 * percent);
    const b = Math.min(255, (num & 0x0000FF) + 255 * percent);
    return `rgb(${r},${g},${b})`;
}

function darken(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.max(0, (num >> 16) * (1 - percent));
    const g = Math.max(0, ((num >> 8) & 0x00FF) * (1 - percent));
    const b = Math.max(0, (num & 0x0000FF) * (1 - percent));
    return `rgb(${r},${g},${b})`;
}


export const Graph = ({ setIsShow, isShow }) => {
    const fgRef = useRef();
    const [hoverNode, setHoverNode] = useState(null);

    const { graph, loading, error } = useUserGraph(1);

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
            graphData={graph}
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
            linkWidth={(link) => {
                if (!hoverNode) return 1;

                const isConnected =
                    link.source === hoverNode ||
                    link.target === hoverNode;

                return isConnected ? 2 : 1;
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
                if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) return;

                const baseSize = node.level === 0 ? 14 : 10;
                const isActive = node === hoverNode;
                const size = isActive ? baseSize * 1.2 : baseSize;

                const level = node.type === "profession" ? 3
                    : node.type === "user" ? node.level
                        : node.type === "skill" ? node.level
                            : 2;

                const levelColor = LEVEL_COLORS[level];
                const mainColor = levelColor.node;

                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.88)`;
                ctx.fill();

                const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 2.5);
                glow.addColorStop(0, `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.35)`);
                glow.addColorStop(0.7, `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.05)`);
                glow.addColorStop(1, `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0)`);
                ctx.beginPath();
                ctx.arc(node.x, node.y, size * 2.5, 0, 2 * Math.PI);
                ctx.fillStyle = glow;
                ctx.fill();

                const highlight = ctx.createRadialGradient(node.x - size * 0.2, node.y - size * 0.2, 0, node.x, node.y, size);
                highlight.addColorStop(0, "rgba(255,255,255,0.25)");
                highlight.addColorStop(1, "rgba(255,255,255,0)");
                ctx.beginPath();
                ctx.arc(node.x, node.y, size, 0, 2 * Math.PI);
                ctx.fillStyle = highlight;
                ctx.fill();

                if (isActive) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size * 1.4, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(${parseInt(mainColor.slice(1, 3), 16)}, ${parseInt(mainColor.slice(3, 5), 16)}, ${parseInt(mainColor.slice(5, 7), 16)}, 0.18)`;
                    ctx.fill();
                }

                const fontSize = 12 / globalScale;
                ctx.font = `500 ${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = isActive ? "#000000" : "#666666";
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                const label = node.label;
                ctx.fillText(label, node.x, node.y + size + 5);
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