import { vector2 } from '../classes/Transform'

export const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    points: vector2[],
    fill = true,
    stroke = false
) => {
    ctx.beginPath()

    for (const point of points) {
        ctx.lineTo(...point)
    }

    ctx.closePath()

    if (fill) {
        ctx.fill()
    }
    if (stroke) {
        ctx.stroke()
    }
}
