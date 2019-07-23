import { simulationMode } from '../types/SimulationSave'
import { baseSave } from '../constants'
import { cloneState } from './cloneState'
import { saveStore } from '../stores/saveStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'
import { compileIc } from '../../integrated-circuits/helpers/compileIc'

/**
 * Inits a simulation by:
 * 1) first initialising the place in localstorage
 * where the simulation will be saved
 * 2) notifying the used about that
 *
 * @param name - the name of the simulation
 * @param mode - the mode of the simulation
 */
export const initSimulation = (name: string, mode: simulationMode) => {
    const state = cloneState(baseSave)
    const translation = CurrentLanguage.getTranslation()

    state.simulation.name = name
    state.simulation.mode = mode

    saveStore.set(name, state)

    toast.success(
        ...createToastArguments(
            translation.messages.createdSimulation(name),
            'check'
        )
    )

    if (mode === 'ic') {
        compileIc(state.simulation)
    }

    return state
}
