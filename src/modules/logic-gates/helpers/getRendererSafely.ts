import { rendererSubject } from '../../core/subjects/rendererSubject'
import { SimulationError } from '../../errors/classes/SimulationError'

/**
 * Gets the current simulation renderer
 *
 * @throws SimulationError no renderer was found
 */
export const getRendererSafely = () => {
    const renderer = rendererSubject.value

    if (!renderer) {
        throw new SimulationError(`Renderer not found`)
    }

    return renderer
}
