import { Transform } from '../../simulation/classes/Transform'

export const drawRotatedSquare = (
    ctx: CanvasRenderingContext2D,
    { position, scale, rotation }: Transform
) => {
    ctx.save()

    ctx.translate(...position)
    ctx.translate(scale[0] / 2, scale[1] / 2)

    ctx.rotate(rotation)

    ctx.fillRect(scale[0] / -2, scale[1] / -2, ...scale)

    ctx.restore()
}
