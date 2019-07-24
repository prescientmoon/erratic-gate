import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { addIdToSelection } from '../../simulationRenderer/helpers/idIsSelected'

/**
 * Selects all the gates of an renderer
 *
 * @param renderer The renderer to selet all the gates of
 */
export const selectAll = (renderer: SimulationRenderer) => {
    for (const { id } of renderer.simulation.gates) {
        addIdToSelection(renderer, 'permanent', id)
    }
}
