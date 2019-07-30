import {
    open as propsAreOpen,
    id as propsModalId
} from '../../logic-gates/subjects/LogicGatePropsSubjects'

/**
 * Opens the properties modal for a gate
 *
 * @param id The id of the gate
 */
export const openGateProps = (id: number) => {
    propsModalId.next(id)
    return propsAreOpen.next(true)
}
