import { Transform } from '../../../common/math/classes/Transform'

/**
 * Checks collision between 2 rects
 *
 * @param rect1 The first rect
 * @param rect2 The second rect
 */
export const aabbCollisionDetection = (rect1: Transform, rect2: Transform) => {
    return !(
        rect1.maxX < rect2.minX ||
        rect1.maxY < rect2.minY ||
        rect1.minX > rect2.maxX ||
        rect1.minY > rect2.maxY
    )
}
