import { SimulationRenderer } from '../classes/SimulationRenderer'

export const clearCanvas = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    ctx.clearRect(0, 0, ...renderer.camera.transform.scale)
}
