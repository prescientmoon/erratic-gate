import { Transform } from '../../../common/math/classes/Transform'
import { Gate, PinWrapper } from '../../simulation/classes/Gate'
import { Pin } from '../../simulation/classes/Pin'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { vector2 } from '../../../common/math/types/vector2'
import { rotateAroundVector } from '../../vector2/helpers/rotate'

export const calculatePinY = (
    transform: Transform,
    index: number,
    total: number
) => {
    const space = transform.height / total

    return (space * (2 * index + 1)) / 2
}

export const calculatePinStart = (
    transform: Transform,
    type: number,
    width: number
) => {
    const direction = (type >> 1) & 1
    const start =
        transform.x + direction * transform.width - Number(!direction) * width

    return start
}

export const calculatePinx = (
    start: number,
    type: number,
    connectionLength: number
) => {
    return start + ((type >> 1) & 1) * connectionLength
}

export const getPinPosition = (
    renderer: SimulationRenderer,
    transform: Transform,
    pin: PinWrapper
) => {
    const { connectionLength } = renderer.options.gates

    // render little connection
    const start = calculatePinStart(
        transform,
        pin.value.type,
        renderer.options.gates.connectionLength
    )

    const height = calculatePinY(transform, pin.index, pin.total)

    const pinX = calculatePinx(start, pin.value.type, connectionLength)
    const pinY = height + transform.y

    // rotate
    const notRotated: vector2 = [pinX, pinY]
    const rotated = rotateAroundVector(
        notRotated,
        transform.center,
        transform.rotation
    )

    return rotated
}
