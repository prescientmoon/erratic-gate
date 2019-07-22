import { LocalStore } from '../../storage/classes/LocalStore'
import { defaultSimulationName } from '../constants'

/**
 * Stores the name of the current simulation
 */
const currentStore = new LocalStore<string>('currentSave')

// This makes sure the store isnt empty
if (!currentStore.get()) {
    currentStore.set(defaultSimulationName)
}

export { currentStore }
