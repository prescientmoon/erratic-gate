import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'

/**
 * Does the cleanup for switching to another simulation
 *
 * @param renderer The renderer to clean up
 */
export const dumpSimulation = (renderer: SimulationRenderer) => {
    renderer.simulation.dispose()
    renderer.lastMousePosition = [0, 0]
    renderer.selectedGates = new Set()
    renderer.selectedPins = {
        end: null,
        start: null
    }
}
