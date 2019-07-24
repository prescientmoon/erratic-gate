import { SimulationRenderer } from '../classes/SimulationRenderer'
import { selectionType } from '../types/selectionType'

/**
 * Checks if an id is selected inside a renderer
 *
 * @param renderer The renderer to check for the id
 * @param gateId The id of the gate
 */
export const idIsSelected = (renderer: SimulationRenderer, gateId: number) => {
    return renderer.allSelectedIds().has(gateId)
}

/**
 * Add an id to a selection set
 *
 * @param renderer The renderer to add the id to the selection set of
 * @param type The selection type
 * @param id The id to select
 */
export const addIdToSelection = (
    renderer: SimulationRenderer,
    type: selectionType = 'temporary',
    id: number
) => {
    if (idIsSelected(renderer, id)) {
        if (renderer.selectedGates.permanent.has(id)) {
            return
        } else if (type === 'temporary') {
            renderer.selectedGates.temporary.delete(id)
            renderer.selectedGates.permanent.add(id)
        }
    } else {
        renderer.selectedGates[type].add(id)
    }
}
