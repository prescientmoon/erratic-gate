import { SimulationRenderer } from '../classes/SimulationRenderer'

/**
 * Renders the selected area of a renderer
 *
 * @param ctx The context to draw on
 * @param renderer The renderer to draw the selected area of
 */
export const renderSelectedArea = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    if (renderer.mouseState >> 2) {
        ctx.fillStyle = renderer.options.selecting.fill
        ctx.strokeStyle = renderer.options.selecting.stroke

        ctx.beginPath()
        ctx.rect(...renderer.selectedArea.getBoundingBox())
        ctx.fill()
        ctx.stroke()
    }
}
