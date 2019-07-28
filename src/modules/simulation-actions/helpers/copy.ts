import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { idStore } from '../../simulation/stores/idStore'
import { deleteGate } from '../../simulationRenderer/helpers/deleteGate'

/**
 * Helper to copy the selection of a renderer
 *
 * @param renderer The renderer to copy the selection of
 */
export const copy = (renderer: SimulationRenderer) => {
    const selected = renderer.getSelected()

    renderer.wireClipboard = []
    renderer.clipboard = selected.map(gate => ({
        name: gate.template.metadata.name,
        position: gate.transform.position
    }))

    for (const wire of renderer.simulation.wires) {
        const start = selected.find(gate => gate === wire.start.value.gate)
        const end = selected.find(gate => gate === wire.end.value.gate)

        if (start && end) {
            const startIndex = selected.indexOf(start)
            const endIndex = selected.indexOf(end)

            renderer.wireClipboard.push({
                id: idStore.generate(),
                from: {
                    id: startIndex,
                    total: wire.start.total,
                    index: wire.start.index
                },
                to: {
                    id: endIndex,
                    total: wire.end.total,
                    index: wire.end.index
                }
            })
        }
    }
}

/**
 * Same as copy but deletes the selected gates
 *
 * @param renderer The renderer to cut the selected gates of
 */
export const cut = (renderer: SimulationRenderer) => {
    copy(renderer)

    for (const gate of renderer.getSelected()) {
        deleteGate(renderer.simulation, gate, renderer)
    }

    renderer.clearSelection()
}
