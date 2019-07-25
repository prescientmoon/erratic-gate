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
