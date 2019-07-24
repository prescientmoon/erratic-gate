import { getRendererState } from '../../saving/helpers/getState'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'

/**
 * Refreshes a simulations
 *
 * @param renderer - the renderer to refresh
 */
export const refresh = (renderer: SimulationRenderer) => {
    renderer.loadSave(getRendererState(renderer))
}
