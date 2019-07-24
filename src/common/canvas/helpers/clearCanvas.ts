import { Screen } from '../../../modules/screen/helpers/Screen'

/**
 * Clears the used portion of the canvas
 *
 * @param ctx the context to clear
 */
export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, Screen.width, Screen.height)
}
