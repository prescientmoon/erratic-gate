import { Transform } from '../../math/classes/Transform'
import { multiply } from '../../../modules/vector2/helpers/basic'

/**
 *
 * @param ctx The context to use
 * @param transform The transform to move relative to
 */
export const useTransform = (
    ctx: CanvasRenderingContext2D,
    { position, rotation, scale }: Transform
) => {
    ctx.translate(...position)
    ctx.translate(scale[0] / 2, scale[1] / 2)

    ctx.rotate(rotation)

    return new Transform(multiply(scale, -0.5), scale, 0)
}
