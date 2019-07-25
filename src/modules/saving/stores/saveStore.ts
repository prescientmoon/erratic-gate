import { LocalStore } from '../../storage/classes/LocalStore'
import { RendererState } from '../types/SimulationSave'
import { initSimulation } from '../helpers/initSimulation'
import { defaultSimulationName } from '../constants'

/**
 * This store is used to save all simulations.
 */
const saveStore = new LocalStore<RendererState>('saves')

if (!saveStore.ls().length) {
    initSimulation(defaultSimulationName, 'project')
}

export { saveStore }
