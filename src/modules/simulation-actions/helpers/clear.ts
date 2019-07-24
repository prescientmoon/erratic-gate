import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'

/**
 * Clears the simuolation of a renderer
 *
 * @param renderer The renderer to clear the simulation of
 */
export const clear = (renderer: SimulationRenderer) => {
    renderer.simulation.dispose()
    renderer.simulation.wires = []
    renderer.simulation.gates.clear()
}
