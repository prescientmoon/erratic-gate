import { SimulationRenderer } from '../classes/SimulationRenderer'
import { MouseEventInfo } from '../../core/types/MouseEventInfo'
import {
    substract,
    multiplyVectors,
    relativeTo
} from '../../vector2/helpers/basic'

export const handleMouseMove = (renderer: SimulationRenderer) => (
    event: MouseEventInfo
) => {
    const worldPosition = renderer.camera.toWordPostition(event.position)

    const offset = substract(renderer.lastMousePosition, worldPosition)

    const scaledOffset = multiplyVectors(
        offset,
        renderer.camera.transform.scale
    )

    if (renderer.mouseState & 1) {
        for (const gate of renderer.getSelected()) {
            const { transform } = gate

            transform.x -= offset[0]
            transform.y -= offset[1]
        }
    }

    if ((renderer.mouseState >> 1) & 1) {
        renderer.camera.transform.position = substract(
            renderer.camera.transform.position,
            scaledOffset
        )

        renderer.spawnCount = 0
    }

    if ((renderer.mouseState >> 2) & 1) {
        renderer.selectedArea.scale = relativeTo(
            renderer.selectedArea.position,
            renderer.camera.toWordPostition(event.position)
        )
    }

    renderer.lastMousePosition = renderer.camera.toWordPostition(event.position)
}
