import { BehaviorSubject } from 'rxjs'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'

export const rendererSubject = new BehaviorSubject<null | SimulationRenderer>(
    null
)
