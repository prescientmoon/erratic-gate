import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { Simulation } from '../../simulation/classes/Simulation'
import { allWiresConnectedToGate } from '../../simulationRenderer/helpers/wireConnectedToGate'
import { deleteGate } from '../../simulationRenderer/helpers/deleteGate'
import { Gate } from '../../simulation/classes/Gate'

/**
 * Deletes all unconnected gates from a renderers simulation
 *
 * @param renderer The renderer to clean the simulation of
 */
export const cleanRenderer = (renderer: SimulationRenderer) => {
    cleanSimulation(renderer.simulation)
}

/**
 * Deletes all unconnected gates from a simulation
 *
 * @param simulation The simulation to clean
 */
export const cleanSimulation = (simulation: Simulation) => {
    const toDelete: Gate[] = []

    for (const gate of simulation.gates) {
        const wires = allWiresConnectedToGate(simulation, gate)

        if (!wires.length) {
            toDelete.push(gate)
        }
    }

    for (const gate of toDelete) {
        deleteGate(simulation, gate)
    }
}
