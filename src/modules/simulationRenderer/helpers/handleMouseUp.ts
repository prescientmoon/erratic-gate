import { SimulationRenderer } from '../classes/SimulationRenderer'
import { MouseEventInfo } from '../../core/types/MouseEventInfo'
import { mouseButtons } from '../constants'
import { SimulationError } from '../../errors/classes/SimulationError'
import { addIdToSelection } from './idIsSelected'
import { gatesInSelection } from './gatesInSelection'

export const handleMouseUp = (renderer: SimulationRenderer) => (
    event: MouseEventInfo
) => {
    if (event.button === mouseButtons.drag && renderer.mouseState & 1) {
        const selected = renderer.getSelected()

        for (const gate of selected) {
            gate.transform.rotation = 0
        }

        renderer.selectedGates.temporary.clear()

        // turn first bit to 0
        renderer.mouseState &= 6

        // for debugging
        if ((renderer.mouseState >> 1) & 1 || renderer.mouseState & 1) {
            throw new SimulationError(
                'First 2 bits of mouseState need to be set to 0'
            )
        }
    }

    if (event.button === mouseButtons.pan && (renderer.mouseState >> 1) & 1) {
        // turn second bit to 0
        renderer.mouseState &= 5
    }

    if (event.button === mouseButtons.select && renderer.mouseState >> 2) {
        // turn the third bit to 0
        renderer.mouseState &= 3

        const selectedGates = gatesInSelection(
            renderer.selectedArea,
            Array.from(renderer.simulation.gates)
        )

        for (const { id } of selectedGates) {
            addIdToSelection(renderer, 'permanent', id)

            const node = renderer.simulation.gates.get(id)

            if (node) {
                renderer.simulation.gates.moveOnTop(node)
            } else {
                throw new SimulationError(
                    `Cannot find node in gate storage with id ${id}`
                )
            }
        }
    }
}
