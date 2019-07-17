import { vector2 } from '../../../common/math/types/vector2'

// TODO: rename
export const smoothStep = (step: number, current: vector2, target: vector2) => {
    return current.map(
        (position, index) => position + (target[index] - position) / step
    ) as vector2
}
