import { CreateSimulationStore } from '../stores/CreateSimulationStore'
import { initSimulation } from '../../saving/helpers/initSimulation'

export const handleCreating = async () => {
    const options = await CreateSimulationStore.create()

    if (!options) return null

    const simulation = initSimulation(options.name, options.mode)

    return simulation
}
