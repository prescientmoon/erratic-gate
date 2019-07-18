import { SimulationRenderer } from '../classes/SimulationRenderer'
import { invert } from '../../vector2/helpers/basic'
import { renderGate } from './renderGate'
import { clearCanvas } from '../../../common/canvas/helpers/clearCanvas'
import { renderClickedPins } from './renderClickedPins'
import { renderWires } from './renderWires'

export const renderSimulation = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    clearCanvas(ctx, renderer)

    ctx.translate(...renderer.camera.transform.position)

    for (const wire of renderer.simulation.wires) {
        renderWires(ctx, renderer, wire)
    }

    for (const gate of renderer.simulation.gates) {
        renderGate(ctx, renderer, gate)
    }

    renderClickedPins(ctx, renderer)

    ctx.translate(...invert(renderer.camera.transform.position))
}
