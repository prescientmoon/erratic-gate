import { SimulationRenderer } from '../classes/SimulationRenderer'
import { invert } from '../../vector2/helpers/basic'
import { renderGate } from './renderGate'
import { clearCanvas } from '../../../common/canvas/helpers/clearCanvas'
import { renderClickedPins } from './renderClickedPins'

export const renderSimulation = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    clearCanvas(ctx, renderer)

    ctx.translate(...renderer.camera.transform.position)

    // render gates
    for (const gate of renderer.simulation.gates) {
        renderGate(ctx, renderer, gate)
    }

    renderClickedPins(ctx, renderer)

    ctx.translate(...invert(renderer.camera.transform.position))
}
