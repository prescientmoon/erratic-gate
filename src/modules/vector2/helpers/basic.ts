import { vector2 } from '../../simulation/classes/Transform'

// Basic stuff for arrays

// If i don't say vector2 as the type adnotation
// ts will throw some errors (because this is recursive)
export const add = (...vectors: vector2[]): vector2 => {
    const first = vectors[0]
    const others = vectors.slice(1)
    const othersSum = others.length > 1 ? add(...others) : others[0]

    return first.map((value, index) => value + othersSum[index]) as vector2
}

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
