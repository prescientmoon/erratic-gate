import { Gate } from '../../simulation/classes/Gate'
import { renderPins } from './renderPins'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { useTransform } from '../../../common/canvas/helpers/useTransform'
import { roundRect } from '../../../common/canvas/helpers/drawRoundedSquare'
import { roundImage } from '../../../common/canvas/helpers/drawRoundedImage'
import { ImageStore } from '../stores/imageStore'
import { gatesInSelection } from './gatesInSelection'
import { idIsSelected } from './idIsSelected'

export const renderGate = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer,
    gate: Gate
) => {
    renderPins(ctx, renderer, gate)

    if (
        ((renderer.mouseState >> 2) & 1 &&
            gatesInSelection(renderer.selectedArea, [gate]).length) ||
        idIsSelected(renderer, gate.id)
    ) {
        ctx.strokeStyle = renderer.options.gates.gateStroke.active
    } else {
        ctx.strokeStyle = renderer.options.gates.gateStroke.normal
    }

    ctx.lineWidth = renderer.options.gates.gateStroke.width

    ctx.save()
    const r = useTransform(ctx, gate.transform)
    const renderingParameters = [
        r.x,
        r.y,
        r.width,
        r.height,
        gate.template.shape.rounded ? gate.template.shape.radius : 0
    ]

    if (gate.template.material.type === 'image') {
        roundImage(
            ctx,
            ImageStore.get(gate.template.material.value),
            ...renderingParameters
        )
    }

    roundRect(ctx, ...renderingParameters)

    ctx.stroke()

    if (gate.template.material.type === 'color') {
        ctx.fillStyle = gate.template.material.value

        ctx.fill()
    }

    ctx.restore()
}
