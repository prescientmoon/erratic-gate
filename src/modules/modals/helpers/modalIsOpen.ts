import { InputStore } from '../../input/stores/InputStore'
import { open as logicGateModalIsOpen } from '../../logic-gates/components/LogicGateModal'
import { CreateSimulationStore } from '../../create-simulation/stores/CreateSimulationStore'

export const modalIsOpen = () => {
    return (
        InputStore.data.open.value ||
        logicGateModalIsOpen.value ||
        CreateSimulationStore.data.open.value
    )
}
