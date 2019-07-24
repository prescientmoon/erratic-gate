import { SidebarAction } from './types/SidebarAction'
import { possibleAction } from './types/possibleAction'
import { save } from '../saving/helpers/save'
import { refresh } from './helpers/refresh'
import { undo } from './helpers/undo'
import { createActionConfig } from './helpers/createActionConfig'
import { clear } from './helpers/clear'

export const actionIcons: Record<possibleAction, string> = {
    clean: 'layers_clear',
    clear: 'clear',
    refresh: 'refresh',
    save: 'save',
    undo: 'undo'
}

/**
 * Array with all the actions for the SimulationAction component to render
 */
export const SidebarActions: Record<possibleAction, SidebarAction> = {
    ...createActionConfig('save', save, ['ctrl', 's']),
    ...createActionConfig(
        'refresh',
        {
            run: refresh
        },
        ['ctrl', 'r']
    ),
    ...createActionConfig(
        'undo',
        {
            run: undo
        },
        ['ctrl', 'z']
    ),
    ...createActionConfig(
        'clear',
        {
            run: clear
        },
        ['ctrl', 'delete']
    ),
    ...createActionConfig(
        'clean',
        {
            run: () => {
                console.log('Cleaning')
            }
        },
        ['ctrl', 'shift', 'delete']
    )
}
