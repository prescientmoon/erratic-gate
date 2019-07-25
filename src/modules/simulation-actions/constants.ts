import { SidebarAction } from './types/SidebarAction'
import { possibleAction } from './types/possibleAction'
import { save } from '../saving/helpers/save'
import { refresh } from './helpers/refresh'
import { undo } from './helpers/undo'
import { createActionConfig } from './helpers/createActionConfig'
import { selectAll } from './helpers/selectAll'
import { deleteSelection } from './helpers/deleteSelection'
import { cleanRenderer } from './helpers/clean'

export const actionIcons: Record<possibleAction, string> = {
    clean: 'clear',
    refresh: 'refresh',
    save: 'save',
    undo: 'undo',
    'select all': 'select_all',
    'delete selection': 'delete'
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
        'clean',
        {
            run: cleanRenderer
        },
        ['ctrl', 'delete']
    ),
    ...createActionConfig('select all', selectAll, ['ctrl', 'a']),
    ...createActionConfig('delete selection', deleteSelection, ['delete'])
}
