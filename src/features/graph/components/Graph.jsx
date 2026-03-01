import { useMemo, useState, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData } from "../const/graphData";

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

export const Graph = () => {
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
            }}
            linkColor={(link) => {
                if (!hoverNode) return "#ECECEC";

                const isConnected =
                    link.source === hoverNode ||
                    link.target === hoverNode;

                return isConnected
                    ? "#8D90A1"
                    : "#ECECEC";
            }}
            linkWidth={(link) => {
                if (!hoverNode) return 1;

                const isConnected =
                    link.source === hoverNode ||
                    link.target === hoverNode;

                return isConnected ? 2 : 1;
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const size =
                    node.level === 0 ? 8 :
                        node.level === 1 ? 6 :
                            node.level === 2 ? 6 :
                                7;

                if (!node.__hoverProgress) node.__hoverProgress = 0;
                if (!node.__dimProgress) node.__dimProgress = 0;

                const isActive = node === hoverNode;
                const hoverTarget = isActive ? 1 : 0;
                const dimTarget = hoverNode && !isActive ? 1 : 0;

                node.__hoverProgress +=
                    (hoverTarget - node.__hoverProgress) * 0.12;

                node.__dimProgress +=
                    (dimTarget - node.__dimProgress) * 0.12;

                const t = node.__hoverProgress;
                const dimT = node.__dimProgress;

                const innerColor = lerpColor(
                    BASE_COLORS.node,
                    ACTIVE_COLORS.inner,
                    t
                );

                const outerColor = lerpColor(
                    BASE_COLORS.border,
                    ACTIVE_COLORS.outer,
                    t
                );

                ctx.globalAlpha = 1 - dimT * 0.7;

                // Внешний круг
                ctx.beginPath();
                ctx.arc(node.x, node.y, size + 2 * t, 0, 2 * Math.PI);
                ctx.fillStyle = outerColor;
                ctx.fill();

                // Внутренний круг
                ctx.beginPath();
                ctx.arc(node.x, node.y, size - 1.5 + t * 2, 0, 2 * Math.PI);
                ctx.fillStyle = innerColor;
                ctx.fill();

                // Glow
                ctx.shadowColor = ACTIVE_COLORS.inner;
                ctx.shadowBlur = 10 * t;

                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;

                // Подпись
                const fontSize = 12 / globalScale;
                ctx.font = `500 ${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = lerpColor("#8D90A1", "#2B2D42", t);
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(
                    node.id,
                    node.x,
                    node.y + size + 6
                );
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 14, 0, 2 * Math.PI);
                ctx.fill();
            }}
        />
    );
};