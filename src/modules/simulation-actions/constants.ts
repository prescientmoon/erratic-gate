import { SidebarAction } from './types/SidebarAction'
import { possibleAction } from './types/possibleAction'
import { save } from '../saving/helpers/save'
import { refresh } from './helpers/refresh'
import { undo } from './helpers/undo'
import { createActionConfig } from './helpers/createActionConfig'
import { selectAll } from './helpers/selectAll'
import { deleteSelection } from './helpers/deleteSelection'
import { cleanRenderer } from './helpers/clean'
import { deleteSimulation } from './helpers/deleteSimulation'
import { copy, cut } from './helpers/copy'
import { paste } from './helpers/paste'
import { duplicate } from './helpers/duplicate'

export const actionIcons: Record<possibleAction, string> = {
    clean: 'clear',
    refresh: 'refresh',
    save: 'save',
    undo: 'undo',
    copy: 'file_copy',
    cut: 'file_copy',
    paste: 'unarchive',
    duplicate: 'view_module',
    'select all': 'select_all',
    'delete selection': 'delete',
    'delete simulation': 'delete_forever'
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
    ...createActionConfig(
        'delete simulation',
        {
            run: deleteSimulation
        },
        ['ctrl', 'shift', 'delete']
    ),
    ...createActionConfig('cut', cut, ['ctrl', 'x']),
    ...createActionConfig('paste', paste, ['ctrl', 'v']),
    ...createActionConfig('duplicate', duplicate, ['ctrl', 'd']),
    ...createActionConfig('copy', copy, ['ctrl', 'c']),
    ...createActionConfig('select all', selectAll, ['ctrl', 'a']),
    ...createActionConfig('delete selection', deleteSelection, ['delete'])
}
