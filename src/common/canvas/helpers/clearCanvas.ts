import { Screen } from '../../../modules/core/classes/Screen'

/**
 * A screen instance used for the canvas clearing
 */
const screen = new Screen()

/**
 * Clears the used portion of the canvas
 *
 * @param ctx the context to clear
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, screen.x, screen.y)
}
