import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { instantiateGateInitter } from '../../simulation/helpers/addGate'
import { Wire } from '../../simulation/classes/Wire'

/**
 * Pastes the content of the clipboard
 *
 * @param renderer The renderer to use
 */
export const paste = (renderer: SimulationRenderer) => {
    const { clipboard, wireClipboard } = renderer

    const ids: number[] = []

    for (const initter of clipboard) {
        ids.push(instantiateGateInitter(renderer, initter, false))
    }

    for (const wire of wireClipboard) {
        const start = renderer.simulation.gates.get(ids[wire.from.id])
        const end = renderer.simulation.gates.get(ids[wire.to.id])

        if (start && end && start.data && end.data) {
            const startPin = start.data._pins.outputs[wire.from.index]
            const endPin = end.data._pins.inputs[wire.to.index]

            renderer.simulation.wires.push(
                new Wire(
                    {
                        value: startPin,
                        index: wire.from.index,
                        total: wire.from.total
                    },
                    {
                        value: endPin,
                        index: wire.to.index,
                        total: wire.to.total
                    }
                )
            )
        }
    }

    renderer.clearSelection()
    renderer.selectedGates.permanent = new Set(ids)
}
