import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { currentStore } from '../stores/currentStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { getRendererState } from './getState'
import { saveStore } from '../stores/saveStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'

export const save = (renderer: SimulationRenderer) => {
    const current = currentStore.get()

    if (current) {
        const state = getRendererState(renderer)

        saveStore.set(current, state)

        toast.info(...createToastArguments(`Succesfully saved ${current}`))
    } else {
        throw new SimulationError(
            'Cannot save without knowing the name of the active simulation'
        )
    }
}
