import { Gate } from '../../simulation/classes/Gate'
import { Wire } from '../../simulation/classes/Wire'
import { Simulation } from '../../simulation/classes/Simulation'

/**
 * Checks if a wire has a gate at any of its ends
 *
 * @param gate The gate to check
 * @param wire The wire to check
 */
export const wireConnectedToGate = (gate: Gate, wire: Wire) =>
    wire.end.value.gate === gate || wire.start.value.gate === gate

/**
 * Finds all the wires a gate has connected to it
 *
 * @param simulation The simulation to check all the wires of
 * @param gate The gate to find the wires for
 */
export const allWiresConnectedToGate = (simulation: Simulation, gate: Gate) => {
    return simulation.wires.filter(wire => wireConnectedToGate(gate, wire))
}
