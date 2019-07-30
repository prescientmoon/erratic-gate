import { InputStore } from '../../input/stores/InputStore'
import { CreateSimulationStore } from '../../create-simulation/stores/CreateSimulationStore'
import { open as propModalIsOpen } from '../../logic-gates/subjects/LogicGatePropsSubjects'

/**
 * Returns true if any modal is open
 */
export const modalIsOpen = () => {
    return (
        InputStore.data.open.value ||
        CreateSimulationStore.data.open.value ||
        propModalIsOpen.value
    )
}
