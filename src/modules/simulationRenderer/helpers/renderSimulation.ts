import { SimulationRenderer } from '../classes/SimulationRenderer'
import { relativeTo, invert } from '../../vector2/helpers/basic'
import { renderGateShadow } from './renderGateShadow'
import { renderGate } from './renderGate'
import { clearCanvas } from './clearCanvas'

export const renderSimulation = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    clearCanvas(ctx, renderer)

    ctx.translate(...renderer.camera.transform.position)

    const center = relativeTo(
        renderer.camera.transform.position,
        renderer.screen.center
    )

    // render gates
    for (const gate of renderer.simulation.gates) {
        if (renderer.options.shadows.enabled) {
            renderGateShadow(
                ctx,
                renderer.options.shadows.color,
                gate,
                renderer.options.shadows.gateHeight,
                [center[0], center[1], renderer.options.shadows.lightHeight]
            )
        }

        renderGate(ctx, gate)
    }

    ctx.translate(...invert(renderer.camera.transform.position))
}
