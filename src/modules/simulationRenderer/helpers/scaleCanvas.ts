import { clamp } from '../../simulation/helpers/clamp'
import { Camera } from '../classes/Camera'
import { vector2 } from '../../../common/math/types/vector2'
import { multiply, substract } from '../../vector2/helpers/basic'
import { repeat } from '../../vector2/helpers/repeat'

const scrollStep = 1.3
const zoomLimits = [0.1, 10]

/*
f(x) = (a - x) / b(x)

f(x0) = f(x1)

(a - x0) / b(x0) = (a - x1) / b(x1)

b = b(x1) / b(x0)

b * (a - x0) = a - x1
x1 = a - b * (a - x0)
*/
export const handleScroll = (e: WheelEvent, camera: Camera) => {
    const sign = -e.deltaY / Math.abs(e.deltaY)
    const zoom = scrollStep ** sign

    if (!e.deltaY) {
        return
    }

    const { position, scale } = camera.transform

    const mousePosition = [e.clientX, e.clientY]
    const oldPosition = [...mousePosition] as vector2

    const oldScale = scale[0]
    const newScale = clamp(zoomLimits[0], zoomLimits[1], oldScale * zoom)

    camera.transform.scale = repeat(newScale, 2) as vector2

    const scaleFraction = newScale / oldScale
    const newPosition = substract(
        oldPosition,
        multiply(substract(oldPosition, position), scaleFraction)
    )

    camera.transform.position = newPosition
}
