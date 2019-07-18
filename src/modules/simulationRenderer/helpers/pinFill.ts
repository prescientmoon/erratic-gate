import { Pin } from '../../simulation/classes/Pin'
import { SimulationRenderer } from '../classes/SimulationRenderer'

export const pinFill = (renderer: SimulationRenderer, pin: Pin) => {
    let color = 'rgba(0,0,0,0)'

    if (pin.pairs.size) {
        if (pin.state.value) {
            color = renderer.options.gates.pinFill.open
        } else {
            color = renderer.options.gates.pinFill.closed
        }
    }

    return color
}
