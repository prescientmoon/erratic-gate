import { vector2 } from '../../math/types/vector2'

/**
 *
 * @param ctx The context to draw on
 * @param points an array of points to draw
 * @param fill if true the polygon will be filled
 * @param stroke if true the polygno will be stroked
 */
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
