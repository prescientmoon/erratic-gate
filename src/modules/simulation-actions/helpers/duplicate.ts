import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { copy } from './copy'
import { paste } from './paste'

export const duplicate = (renderer: SimulationRenderer) => {
    copy(renderer)
    paste(renderer)
}
