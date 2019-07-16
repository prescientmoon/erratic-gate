import { vector2 } from '../../simulation/classes/Transform'
import { length } from './basic'

export const minVector = (...vectors: vector2[]) => {
    let min = length(vectors[0])
    let current = 0

    for (let index = 1; index < vectors.length; index++) {
        const size = length(vectors[index])

        if (size < min) {
            min = size
            current = index
        }
    }

    return current
}

export const maxVector = (...vectors: vector2[]) => {
    let max = length(vectors[0])
    let current = 0

    for (let index = 1; index < vectors.length; index++) {
        const size = length(vectors[index])

        if (size > max) {
            max = size
            current = index
        }
    }

    return current
}
