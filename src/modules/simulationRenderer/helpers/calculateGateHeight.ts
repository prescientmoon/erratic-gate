import { Gate } from '../../simulation/classes/Gate'
import { SimulationRenderer } from '../classes/SimulationRenderer'

/**
 * Calculates the correct height for a gate
 *
 * @param renderer The renderer to get the pin-radius of
 * @param gate The gate to get the height of
 */
export const calculateGateHeight = (
    renderer: SimulationRenderer,
    gate: Gate
) => {
    return Math.max(
        gate.transform.scale[1],
        Math.max(gate._pins.outputs.length, gate._pins.inputs.length) *
            4 *
            renderer.options.gates.pinRadius
    )
}
