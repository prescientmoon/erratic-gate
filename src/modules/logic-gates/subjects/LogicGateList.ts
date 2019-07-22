import { BehaviorSubject } from 'rxjs'
import { templateStore } from '../../saving/stores/templateStore'
import { getAllics } from '../helpers/getAllIcs'

/**
 * The interface for the items in the list
 */
export interface LogicGateNameWrapper {
    source: 'base' | 'ic'
    name: string
}

/**
 * Subject containing a list with the names of all logic gate templates
 */
export const LogicGateList = new BehaviorSubject<LogicGateNameWrapper[]>([])

/**
 * Helper method to update the list of logic gate templates.
 */
export const updateLogicGateList = () => {
    const ics = getAllics().map(
        (name): LogicGateNameWrapper => ({
            source: 'ic',
            name
        })
    )

    const templates = templateStore.ls().map(
        (name): LogicGateNameWrapper => ({
            source: 'base',
            name
        })
    )

    LogicGateList.next([...ics, ...templates])
}
