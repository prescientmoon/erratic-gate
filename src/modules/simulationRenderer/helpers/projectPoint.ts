import { vector3, vector2 } from '../../simulation/classes/Transform'

export const projectPointOnPlane = (point: vector3, light: vector3) =>
    point.slice(0, 2).map((position, index) => {
        const delta = light[index] - position

        return light[index] - (delta + (point[2] * delta) / light[2])
    }) as vector2
