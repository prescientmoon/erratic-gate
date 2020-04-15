import { currentStore } from '../stores/currentStore'
import { rendererSubject } from '../../core/subjects/rendererSubject'
import { SimulationError } from '../../errors/classes/SimulationError'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { dumpSimulation } from './dumpSimulation'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'
import { compileIc } from '../../integrated-circuits/helpers/compileIc'
import { getRendererState } from './getState'

/**
 * Used to switch to a simulation
 *
 * @throws SimulationError if theres no renderer stored in the rendererSubject
 *
 * @param simulationName The name of the simulation to switch to
 *
 * @example
 * switchTo()
 * switchTo('test')
 *
 */
export const switchTo = (simulationName: string = 'default') => {
    if (rendererSubject.value) {
        const renderer = rendererSubject.value
        const translation = CurrentLanguage.getTranslation()
        const state = getRendererState(renderer)

        // compile the ic just in case
        if (state.simulation.mode === 'ic') {
            compileIc(state.simulation, true)
        }

        dumpSimulation(renderer)

        currentStore.set(simulationName)
        renderer.reloadSave()

        toast(
            ...createToastArguments(
                translation.messages.switchedToSimulation(simulationName),
                'arrow_right_alt'
            )
        )
    } else {
        throw new SimulationError(
            `Renderer not found while trying to switch to simulation '${simulationName}'`
        )
    }
}
