import { Gate } from '../../simulation/classes/Gate'
import { drawRotatedSquare } from '../../../common/canvas/helpers/drawRotatedSquare'
import { renderPins } from './renderPins'
import { SimulationRenderer } from '../classes/SimulationRenderer'

export const renderGate = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer,
    gate: Gate
) => {
    renderPins(ctx, renderer, gate)

    if (renderer.selectedGate === gate.id) {
        ctx.strokeStyle = renderer.options.gates.gateStroke.active
    } else {
        ctx.strokeStyle = renderer.options.gates.gateStroke.normal
    }

    ctx.lineWidth = renderer.options.gates.gateStroke.width

    if (gate.template.material.type === 'color') {
        ctx.fillStyle = gate.template.material.value
        drawRotatedSquare(ctx, gate.transform, gate.template.shape)
        ctx.stroke()
    }
}
