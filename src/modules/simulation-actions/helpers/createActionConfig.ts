import { possibleAction } from '../types/possibleAction'
import { SidebarAction } from '../types/SidebarAction'
import { actionIcons } from '../constants'
import { createRendererAction } from './createRendererActions'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { getRendererSafely } from '../../logic-gates/helpers/getRendererSafely'

export type ActionConfigFunction = (renderer: SimulationRenderer) => void

export type ActionConfigCallback =
    | {
          renderer?: boolean
          run: ActionConfigFunction
      }
    | ActionConfigFunction

export const createActionConfig = <T extends possibleAction>(
    name: T,
    callback: ActionConfigCallback,
    keybinding: string[] = []
): Record<T, SidebarAction> => {
    let action: ActionConfigFunction

    if (callback instanceof Function) {
        action = callback
    } else {
        if (callback.renderer !== false) {
            action = createRendererAction(name, callback.run)
        } else {
            action = callback.run
        }
    }

    return {
        [name]: {
            name,
            action: () => {
                action(getRendererSafely())
            },
            icon: actionIcons[name],
            keybinding
        }
    }
}
