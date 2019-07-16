import { vector2, Transform } from '../../simulation/classes/Transform'

export const pointInSquare = (point: vector2, square: Transform) => {
    return (
        point[0] >= square.x &&
        point[0] <= square.maxX &&
        point[1] >= square.y &&
        point[1] <= square.maxY
    )
}
