import { Gate } from '../classes/Gate'
import { drawRotatedSquare } from './drawRotatedSquare'
import { MouseManager } from '../classes/MouseManager'

export const renderGate = (ctx: CanvasRenderingContext2D, gate: Gate) => {
    let mode = 0

    if (gate.transform.rotation > 0) mode = 1
    else if (gate.transform.rotation < 0) mode = -1

    ctx.fillStyle = gate.color
    drawRotatedSquare(ctx, gate.transform, mode)
}
