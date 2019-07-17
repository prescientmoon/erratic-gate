import { Transform } from '../../math/classes/Transform'
import { multiply } from '../../../modules/vector2/helpers/basic'

export const useTransform = (
    ctx: CanvasRenderingContext2D,
    { position, rotation, scale }: Transform
) => {
    ctx.translate(...position)
    ctx.translate(scale[0] / 2, scale[1] / 2)

    ctx.rotate(rotation)

    return new Transform(multiply(scale, -0.5), scale, 0)
}
