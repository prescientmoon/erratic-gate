import { Transform } from '../classes/Transform'

export const drawRotatedSquare = (
    ctx: CanvasRenderingContext2D,
    { position, scale, rotation }: Transform,
    rotationMode = 0
) => {
    ctx.save()

    ctx.translate(...position)

    if (rotationMode === 0) {
        ctx.translate(scale[0] / 2, scale[1] / 2)
    } else if (rotationMode === 1) {
        ctx.translate(scale[0], scale[1])
    } else if (rotationMode === 1) {
        ctx.translate(0, scale[1])
    }

    ctx.rotate(rotation)

    if (rotationMode === 0) {
        ctx.fillRect(scale[0] / -2, scale[1] / -2, ...scale)
    } else if (rotationMode === 1) {
        ctx.fillRect(-scale[0], -scale[1], ...scale)
    } else if (rotationMode === -1) {
        ctx.fillRect(0, 0, ...scale)
    }

    ctx.restore()
}
