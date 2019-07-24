import { SimulationRenderer } from '../classes/SimulationRenderer'
import { Gate } from '../../simulation/classes/Gate'
import { wireConnectedToGate } from './wireConnectedToGate'
import { Simulation } from '../../simulation/classes/Simulation'

/**
 * Helper to delete a gate from a simulation
 *
 * @param simulation The simulation to remove the gate from
 * @param gate The gate to remove
 */
export const deleteGate = (simulation: Simulation, gate: Gate) => {
    const node = simulation.gates.get(gate.id)

    if (!node) {
        return
    }

    for (const wire of simulation.wires) {
        if (wireConnectedToGate(gate, wire)) {
            wire.dispose()
        }
    }

    simulation.wires = simulation.wires.filter(wire => wire.active)

    gate.dispose()
    simulation.gates.delete(node)
}
