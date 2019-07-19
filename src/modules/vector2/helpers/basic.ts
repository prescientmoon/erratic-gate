import { vector2 } from '../../../common/math/types/vector2'

// Basic stuff for arrays

// If i don't say vector2 as the type adnotation
// ts will throw some errors (because this is recursive)
export const add = (...vectors: vector2[]): vector2 => {
    const first = vectors[0]
    const others = vectors.slice(1)
    const othersSum = others.length > 1 ? add(...others) : others[0]

    return first.map((value, index) => value + othersSum[index]) as vector2
}

// This just vhanges the direction of the vector
export const invert = (vector: vector2) => vector.map(val => -val) as vector2

// This gets the length of a vector
export const length = (vector: vector2) =>
    Math.sqrt(vector[0] ** 2 + vector[1] ** 2)

// This multiplies a vector with a scalaer
export const multiply = (vector: vector2, scalar: number) =>
    vector.map(val => val * scalar) as vector2

// This makese the length of the vector 1
export const normalise = (vector: vector2) => {
    const size = length(vector)

    return vector.map(val => val / size) as vector2
}

// This changes the length of the vector to some valie
export const ofLength = (vector: vector2, l: number) => {
    return multiply(vector, l / length(vector))
}

// This returns a vector relative to the other
export const relativeTo = (vector: vector2, other: vector2) =>
    add(other, invert(vector))

export const inverse = (vector: vector2) => vector.map(a => 1 / a) as vector2
