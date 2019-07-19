import { LocalStore } from '../../storage/classes/LocalStore'
import { defaultSimulationName } from '../constants'

const currentStore = new LocalStore<string>('currentSave')

if (!currentStore.get()) {
    currentStore.set(defaultSimulationName)
}

export { currentStore }
