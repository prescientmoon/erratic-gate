import { MouseEventInfo } from '../../core/types/MouseEventInfo'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { pointInSquare } from '../../../common/math/helpers/pointInSquare'
import { idIsSelected, addIdToSelection } from './idIsSelected'
import { mouseButtons, shiftInput } from '../constants'
import { SimulationError } from '../../errors/classes/SimulationError'
import { openGateProps } from './openGateProps'
import { getPinPosition } from './pinPosition'
import { pointInCircle } from '../../../common/math/helpers/pointInCircle'
import { deleteWire } from '../../simulation/helpers/deleteWire'
import { Wire } from '../../simulation/classes/Wire'

export const handleMouseDown = (renderer: SimulationRenderer) => (
    event: MouseEventInfo
) => {
    const worldPosition = renderer.camera.toWordPostition(event.position)
    const gates = Array.from(renderer.simulation.gates)

    renderer.lastMousePosition = worldPosition

    // We need to iterate from the last to the first
    // because if we have 2 overlapping gates,
    // we want to select the one on top
    for (let index = gates.length - 1; index >= 0; index--) {
        const { transform, id, pins, template } = gates[index]

        if (pointInSquare(worldPosition, transform)) {
            if (event.button === mouseButtons.drag) {
                gates[index].onClick()

                renderer.mouseState |= 1

                if (!idIsSelected(renderer, id)) {
                    renderer.clearSelection()
                    addIdToSelection(renderer, 'temporary', id)
                }

                const gateNode = renderer.simulation.gates.get(id)

                if (gateNode) {
                    return renderer.simulation.gates.moveOnTop(gateNode)
                } else {
                    throw new SimulationError(`Cannot find gate with id ${id}`)
                }
            } else if (
                event.button === mouseButtons.properties &&
                template.properties.enabled
            ) {
                return openGateProps(id)
            }
        }

        for (const pin of pins) {
            const position = getPinPosition(renderer, transform, pin)

            if (
                pointInCircle(
                    worldPosition,
                    position,
                    renderer.options.gates.pinRadius
                )
            ) {
                if (pin.value.pairs.size) {
                    if (pin.value.type & 1) {
                        const wire = renderer.simulation.wires.find(
                            wire => wire.end.value === pin.value
                        )

                        if (wire) {
                            deleteWire(renderer.simulation, wire)
                        } else {
                            throw new SimulationError(
                                `Cannot find wire to remove`
                            )
                        }

                        return
                    }
                }

                if (
                    renderer.selectedPins.start &&
                    pin.value === renderer.selectedPins.start.wrapper.value
                ) {
                    renderer.selectedPins.start = null
                    renderer.selectedPins.end = null
                } else if (
                    renderer.selectedPins.end &&
                    pin.value === renderer.selectedPins.end.wrapper.value
                ) {
                    renderer.selectedPins.start = null
                    renderer.selectedPins.end = null
                } else if ((pin.value.type & 2) >> 1) {
                    renderer.selectedPins.start = {
                        wrapper: pin,
                        transform
                    }
                } else if (pin.value.type & 1) {
                    renderer.selectedPins.end = {
                        wrapper: pin,
                        transform
                    }
                }

                if (renderer.selectedPins.start && renderer.selectedPins.end) {
                    renderer.simulation.wires.push(
                        new Wire(
                            renderer.selectedPins.start.wrapper,
                            renderer.selectedPins.end.wrapper
                        )
                    )
                    renderer.selectedPins.start = null
                    renderer.selectedPins.end = null
                }

                return
            }
        }
    }

    if (!shiftInput.value && event.button === mouseButtons.unselect) {
        renderer.clearSelection()
    }

    if (event.button === mouseButtons.pan) {
        // the second bit = pannning
        renderer.mouseState |= 0b10
    } else if (event.button === mouseButtons.select) {
        renderer.selectedArea.position = renderer.lastMousePosition
        renderer.selectedArea.scale = [0, 0]

        // the third bit = selecting
        renderer.mouseState |= 0b100
    }
}
