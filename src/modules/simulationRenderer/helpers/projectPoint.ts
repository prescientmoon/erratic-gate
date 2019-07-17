import { vector3 } from '../../../common/math/types/vector3'
import { vector2 } from '../../../common/math/types/vector2'

export const projectPointOnPlane = (point: vector3, light: vector3) =>
    point.slice(0, 2).map((position, index) => {
        const delta = light[index] - position

        return light[index] - (delta + (point[2] * delta) / light[2])
    }) as vector2
