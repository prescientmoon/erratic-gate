import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { currentStore } from '../stores/currentStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { getRendererState } from './getState'
import { saveStore } from '../stores/saveStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'

/**
 * Saves the state from a renderer in localStorage,
 * then notifies the user about it
 *
 * @throws SimulationError if the simulation name
 * cannot found in the currentStore
 *
 * @param renderer - the renderer to saev the state of
 */
export const save = (renderer: SimulationRenderer) => {
    const current = currentStore.get()

    if (current) {
        const state = getRendererState(renderer)
        const translation = CurrentLanguage.getTranslation()

        saveStore.set(current, state)

        toast(
            ...createToastArguments(
                translation.messages.savedSimulation(current),
                'save'
            )
        )
    } else {
        throw new SimulationError(
            'Cannot save without knowing the name of the active simulation'
        )
    }
}
