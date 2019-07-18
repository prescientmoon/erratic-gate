import { Gate } from '../../simulation/classes/Gate'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { useTransform } from '../../../common/canvas/helpers/useTransform'
import { calculatePinStart, calculatePinY, calculatePinx } from './pinPosition'
import { pinFill } from './pinFill'

export const renderPins = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer,
    gate: Gate
) => {
    ctx.save()

    const {
        connectionLength,
        pinRadius,
        pinStrokeColor,
        pinStrokeWidth
    } = renderer.options.gates
    const relativeTransform = useTransform(ctx, gate.transform)

    ctx.strokeStyle = pinStrokeColor
    ctx.lineWidth = pinStrokeWidth

    for (const pin of gate.pins) {
        ctx.fillStyle = pinFill(renderer, pin.value)

        // render little connection
        const start = calculatePinStart(
            relativeTransform,
            pin.value.type,
            connectionLength
        )

        const height = calculatePinY(relativeTransform, pin.index, pin.total)

        const pinX = calculatePinx(start, pin.value.type, connectionLength)
        const pinY = height + relativeTransform.y

        ctx.beginPath()
        ctx.moveTo(start, pinY)
        ctx.lineTo(start + connectionLength, pinY)
        ctx.stroke()

        // render actual pin
        ctx.beginPath()
        ctx.ellipse(pinX, pinY, pinRadius, pinRadius, 0, 0, 2 * Math.PI)
        ctx.fill()
        ctx.stroke()
    }

    ctx.restore()
}
