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

    if (gate.template.material.type === 'color') {
        ctx.fillStyle = gate.template.material.value
        drawRotatedSquare(ctx, gate.transform, gate.template.shape)
    }
}
