import { Simulation } from '../classes/Simulation'
import { Wire } from '../classes/Wire'
import { removeElement } from '../../../common/lang/arrays/helpers/removeElement'

export const deleteWire = (simulation: Simulation, wire: Wire) => {
    removeElement(simulation.wires, wire)

    wire.dispose()
}
