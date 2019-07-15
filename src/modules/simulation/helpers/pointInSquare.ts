import { vector2, Transform } from '../classes/Transform'
import { LruCacheNode } from '@eix-js/utils'

export const pointInSquare = (point: vector2, square: Transform) => {
    return (
        point[0] >= square.x &&
        point[0] <= square.maxX &&
        point[1] >= square.y &&
        point[1] <= square.maxY
    )
}
