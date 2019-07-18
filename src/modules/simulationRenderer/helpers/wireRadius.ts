import { SimulationRenderer } from '../classes/SimulationRenderer'

export const wireRadius = (renderer: SimulationRenderer) => {
    return (
        2 *
        (renderer.options.gates.pinRadius -
            renderer.options.gates.pinStrokeWidth)
    )
}
