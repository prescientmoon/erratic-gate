import { vector2 } from '../../simulation/classes/Transform'

// Basic stuff for arrays

export const add = (first: vector2, second: vector2) =>
    first.map((value, index) => value + second[index]) as vector2

export const invert = (vector: vector2) => vector.map(val => -val) as vector2

export const length = (vector: vector2) =>
    Math.sqrt(vector[0] ** 2 + vector[1] ** 2)

export const multiply = (vector: vector2, scalar: number) =>
    vector.map(val => val * scalar) as vector2

export const normalise = (vector: vector2) => {
    const size = length(vector)

    return vector.map(val => val / size) as vector2
}

export const ofLength = (vector: vector2, l: number) => {
    return multiply(vector, l / length(vector))
}
