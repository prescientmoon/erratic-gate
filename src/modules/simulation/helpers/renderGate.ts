import { Gate } from '../classes/Gate'
import { drawRotatedSquare } from './drawRotatedSquare'

export const renderGate = (ctx: CanvasRenderingContext2D, gate: Gate) => {
    ctx.fillStyle = gate.color
    drawRotatedSquare(ctx, gate.transform)
}
