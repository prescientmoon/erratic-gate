import { Transform } from '../../math/classes/Transform'
import { Shape } from '../../../modules/simulation/types/GateTemplate'
import { roundRect } from './drawRoundedSquare'
import { useTransform } from './useTransform'

/**
 * Draws a square from a transform
 *
 * @param ctx The context to draw on
 * @param transform -The transform to use
 * @param shape - The shae object to use
 */
export const drawRotatedSquare = (
    ctx: CanvasRenderingContext2D,
    transform: Transform,
    shape: Shape
) => {
    ctx.save()

    const relative = useTransform(ctx, transform)

    roundRect(
        ctx,
        relative.x,
        relative.y,
        relative.width,
        relative.height,
        shape.radius ? shape.radius : 0
    )

    ctx.fill()

    ctx.restore()
}
