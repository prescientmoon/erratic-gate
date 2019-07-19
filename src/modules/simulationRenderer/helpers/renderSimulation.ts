import { SimulationRenderer } from '../classes/SimulationRenderer'
import { invert, inverse } from '../../vector2/helpers/basic'
import { renderGate } from './renderGate'
import { clearCanvas } from '../../../common/canvas/helpers/clearCanvas'
import { renderClickedPins } from './renderClickedPins'
import { renderWires } from './renderWires'
import { vector2 } from '../../../common/math/classes/Transform'

export const renderSimulation = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    clearCanvas(ctx)

    const transform = renderer.camera.transform

    ctx.translate(...transform.position)
    ctx.scale(...transform.scale)

    for (const wire of renderer.simulation.wires) {
        renderWires(ctx, renderer, wire)
    }

    for (const gate of renderer.simulation.gates) {
        renderGate(ctx, renderer, gate)
    }

    renderClickedPins(ctx, renderer)

    ctx.scale(...inverse(transform.scale))
    ctx.translate(...invert(transform.position))
}
