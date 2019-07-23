import { BehaviorSubject } from 'rxjs'
import { templateStore } from '../../saving/stores/templateStore'

/**
 * Subject containing a list with the names of all logic gate templates
 */
export const LogicGateList = new BehaviorSubject<string[]>([])

/**
 * Helper method to update the list of logic gate templates.
 */
export const updateLogicGateList = () => {
    LogicGateList.next(templateStore.ls())
}
