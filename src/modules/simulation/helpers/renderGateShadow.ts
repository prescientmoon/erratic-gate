import { Gate } from '../classes/Gate'
import { vector2, Transform } from '../classes/Transform'
import { clamp } from './clamp'
import { drawRotatedSquare } from './drawRotatedSquare'

export const renderGateShadow = (
    ctx: CanvasRenderingContext2D,
    color: string,
    gate: Gate
) => {
    const scale = gate.transform.scale

    ctx.fillStyle = color

    drawRotatedSquare(
        ctx,
        new Transform(gate.shadow, scale, gate.transform.rotation)
    )
}
