import { rendererSubject } from '../../core/subjects/rendererSubject'
import { SimulationError } from '../../errors/classes/SimulationError'
import { SimulationRenderer } from '../classes/SimulationRenderer'

/**
 * Helper to create the simulationRenderer
 *
 * @throws SimulationError if the renderer already exists
 */
export const initRenderer = () => {
    if (rendererSubject.value) {
        throw new SimulationError('Renderer already inited')
    } else {
        rendererSubject.next(new SimulationRenderer())
    }
}
