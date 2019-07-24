import { Transform } from '../classes/Transform'
import { vector2 } from '../types/vector2'

export const pointInSquare = (point: vector2, square: Transform) => {
    return (
        point[0] >= square.minX &&
        point[0] <= square.maxX &&
        point[1] >= square.minY &&
        point[1] <= square.maxY
    )
}

/**
 * The old version of pontInSquare
 */
export const oldPointInSquare = (point: vector2, square: Transform) => {
    return (
        point[0] >= square.x &&
        point[0] <= square.x + square.width &&
        point[1] >= square.y &&
        point[1] <= square.y + square.height
    )
}
