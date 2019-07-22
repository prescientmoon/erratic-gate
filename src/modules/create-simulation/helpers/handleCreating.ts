import { CreateSimulationStore } from '../stores/CreateSimulationStore'
import { initSimulation } from '../../saving/helpers/initSimulation'
import { switchTo } from '../../saving/helpers/switchTo'

export const handleCreating = async () => {
    const options = await CreateSimulationStore.create()

    if (!options) return null

    const simulation = initSimulation(options.name, options.mode)

    switchTo(options.name)

    return simulation
}
