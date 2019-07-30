import { SimulationRenderer } from '../classes/SimulationRenderer'

/**
 * Gets the stroke width for wires
 */
export const wireRadius = (renderer: SimulationRenderer) => {
    return (
        2 *
        (renderer.options.gates.pinRadius -
            renderer.options.gates.pinStrokeWidth)
    )
}
