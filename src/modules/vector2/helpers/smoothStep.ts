import { vector2 } from '../../simulation/classes/Transform'

// TODO: rename
export const smoothStep = (step: number, current: vector2, target: vector2) => {
    return current.map(
        (position, index) => position + (target[index] - position) / step
    ) as vector2
}
