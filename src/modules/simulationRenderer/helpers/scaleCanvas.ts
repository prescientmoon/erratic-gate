import { clamp } from '../../simulation/helpers/clamp'
import { Camera } from '../classes/Camera'
import { vector2 } from '../../../common/math/classes/Transform'
import { MouseEventInfo } from '../../core/components/MouseEventInfo'
import { Screen } from '../../screen/helpers/Screen'

const scrollStep = 1.3
const zoomLimits = [0.1, 10]

let absoluteMousePosition = [Screen.width / 2, Screen.height]

export const updateMouse = (e: MouseEventInfo) => {
    absoluteMousePosition = e.position
}

export const handleScroll = (e: WheelEvent, camera: Camera) => {
    const sign = e.deltaY / Math.abs(e.deltaY)
    const zoom = scrollStep ** sign

    const mouseFraction = Screen.scale.map(
        (value, index) => absoluteMousePosition[index] / value
    )
    const newScale = camera.transform.scale.map(value =>
        clamp(zoomLimits[0], zoomLimits[1], value * zoom)
    )
    const delta = camera.transform.scale.map(
        (value, index) =>
            Screen.scale[index] *
            (newScale[index] - value) *
            mouseFraction[index]
    )

    camera.transform.scale = newScale as vector2
    camera.transform.position = camera.transform.position.map(
        (value, index) => value - delta[index]
    ) as vector2
}
