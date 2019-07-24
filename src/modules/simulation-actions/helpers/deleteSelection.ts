import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { deleteGate } from '../../simulationRenderer/helpers/deleteGate'

export const deleteSelection = (renderer: SimulationRenderer) => {
    for (const gate of renderer.getSelected()) {
        deleteGate(renderer.simulation, gate)
    }
}
