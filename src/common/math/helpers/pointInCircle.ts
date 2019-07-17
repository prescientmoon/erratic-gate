import { vector2 } from '../types/vector2'
import { length, relativeTo } from '../../../modules/vector2/helpers/basic'

export const pointInCircle = (
    point: vector2,
    center: vector2,
    radius: number
) => {
    return length(relativeTo(point, center)) < radius
}
