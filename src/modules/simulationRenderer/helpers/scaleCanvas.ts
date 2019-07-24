import { Screen } from '../../core/classes/Screen'
import { clamp } from '../../simulation/helpers/clamp'
import { Camera } from '../classes/Camera'
import { vector2 } from '../../../common/math/classes/Transform'
import { MouseEventInfo } from '../../core/components/MouseEventInfo'
// import { WheelEvent } from 'react'

const screen = new Screen()

const scrollStep = 1.3
const zoomLimits = [0.1, 10]

let absoluteMousePosition = [screen.x / 2, screen.y / 2]

export const updateMouse = (e: MouseEventInfo) => {
    absoluteMousePosition = e.position
}

export const handleScroll = (e: WheelEvent, camera: Camera) => {
    const sign = e.deltaY / Math.abs(e.deltaY)
    const zoom = scrollStep ** sign

    const size = [screen.width.value, screen.height.value]
    const mouseFraction = size.map(
        (value, index) => absoluteMousePosition[index] / value
    )
    const newScale = camera.transform.scale.map(value =>
        clamp(zoomLimits[0], zoomLimits[1], value * zoom)
    )
    const delta = camera.transform.scale.map(
        (value, index) =>
            size[index] * (newScale[index] - value) * mouseFraction[index]
    )

    camera.transform.scale = newScale as vector2
    camera.transform.position = camera.transform.position.map(
        (value, index) => value - delta[index]
    ) as vector2
}
