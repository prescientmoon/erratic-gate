import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'

/**
 * Undoes a simulation
 *
 * @param renderer - the renderer to undo the simulation of
 */
export const undo = (renderer: SimulationRenderer) => {
    renderer.reloadSave()
}
