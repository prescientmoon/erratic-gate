import { Transform } from '../../math/classes/Transform'
import { Material, Shape } from '../../../modules/simulation/types/GateTemplate'
import { roundRect } from './drawRoundedSquare'

export const drawRotatedSquare = (
    ctx: CanvasRenderingContext2D,
    { position, scale, rotation }: Transform,
    shape: Shape
) => {
    ctx.save()

    ctx.translate(...position)
    ctx.translate(scale[0] / 2, scale[1] / 2)

    ctx.rotate(rotation)

    if (shape.rounded) {
        roundRect(
            ctx,
            -scale[0] / 2,
            -scale[1] / 2,
            scale[0],
            scale[1],
            shape.radius
        )

        ctx.fill()
    } else {
        ctx.fillRect(scale[0] / -2, scale[1] / -2, ...scale)
    }

    ctx.restore()
}
