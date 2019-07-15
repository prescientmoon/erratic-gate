import { vector2 } from '../../simulation/classes/Transform'
import { add, invert } from './basic'

const { cos, sin } = Math

export const rotate = (vector: vector2, angle: number): vector2 => {
    const x = cos(angle) * vector[0] - sin(angle) * vector[1]
    const y = sin(angle) * vector[0] + cos(angle) * vector[1]

    return [x, y]
}

export const rotateAroundVector = (
    vector: vector2,
    around: vector2,
    angle: number
) => {
    const translated = add(vector, invert(around))
    const rotated = rotate(translated, angle)

    return add(rotated, around)
}
