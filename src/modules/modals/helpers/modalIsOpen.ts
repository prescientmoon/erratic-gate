import { InputStore } from '../../input/stores/InputStore'
import { CreateSimulationStore } from '../../create-simulation/stores/CreateSimulationStore'

export const modalIsOpen = () => {
    return InputStore.data.open.value || CreateSimulationStore.data.open.value
}
