import { possibleAction } from '../types/possibleAction'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'
import { getRendererSafely } from '../../logic-gates/helpers/getRendererSafely'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { actionIcons } from '../constants'
import { toast } from 'react-toastify'
import { Translation } from '../../internalisation/types/TranslationInterface'

/**
 * Map used to get the correct message from any action name
 */
export const actionToMessageMap: Partial<
    Record<possibleAction, keyof Translation['messages']>
> = {
    clean: 'cleaned',
    refresh: 'refreshed',
    undo: 'undone',
    save: 'savedSimulation'
}

export const createRendererAction = (
    action: possibleAction,
    callback: (renderer: SimulationRenderer) => void
) => () => {
    const translation = CurrentLanguage.getTranslation()
    const renderer = getRendererSafely()

    callback(renderer)

    const messageName = actionToMessageMap[action]

    if (messageName) {
        toast(
            ...createToastArguments(
                translation.messages[messageName](renderer.simulation.name),
                actionIcons[action]
            )
        )
    }
}
