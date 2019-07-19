import { templateStore } from '../../saving/stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { Simulation } from '../classes/Simulation'
import { Gate } from '../classes/Gate'

export const addGate = (simulation: Simulation, templateName: string) => {
    const template = templateStore.get(templateName)

    if (!template)
        throw new SimulationError(`Cannot find template ${templateName}`)

    simulation.push(new Gate(template))
}
