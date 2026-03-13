export const defaultColors = {
    nodeColor: '#d5c9f0',
    activeNodeColor: '#6b6ed3',
    labelColor: '#1a1818',
    tooltipColor: '#f7ebeb',
}

const defaultNodeSize = 4

export const drawNodeLabel = ({
    node,
    ctx,
    globalScale = 1,
    fontSize = 8,
    offset = 5,
    hoverNodes = [],
    clickNodes = [],
    debug,
}) => {
    const { activeNodeColor, labelColor } = defaultColors

    const nodeX = node.x || 0
    const nodeY = node.y || 0
    const nodeSize = Number(node.size) || defaultNodeSize

    // Рисуем текст
    const label = String(node.name || node.id)
    const _fontSize = fontSize / globalScale
    ctx.font = `${_fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const _labelColor = node.labelColor || labelColor
    const labelActiveColor = node.labelActiveColor || activeNodeColor
    // Цвет подписи зависит от состояния узла
    ctx.fillStyle =
        hoverNodes.includes(node) || clickNodes.includes(node)
            ? labelActiveColor
            : _labelColor
    ctx.fillText(label, nodeX, nodeY + nodeSize + offset)

    // Вычисляем значения для области выделения/клика
    const textWidth = ctx.measureText(label).width
    const pointerArea = {
        x: nodeX - textWidth / 2,
        y: nodeY - nodeSize / 2 - offset / 2,
        width: textWidth,
        height: nodeSize + fontSize + offset,
    }

    // Если включен режим отладки
    if (debug) {
        // Рисуем область выделения/клика
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
        ctx.fillRect(
            pointerArea.x,
            pointerArea.y,
            pointerArea.width,
            pointerArea.height,
        )
    }

    // Для повторного использования в `drawNodePointerArea`
    node.pointerArea = pointerArea
}

export const drawNodePointerArea = ({
    node,
    color,
    ctx,
}) => {
    ctx.fillStyle = color
    const pointerArea = node.pointerArea
    pointerArea &&
        ctx.fillRect(
            pointerArea.x,
            pointerArea.y,
            pointerArea.width,
            pointerArea.height,
        )
}