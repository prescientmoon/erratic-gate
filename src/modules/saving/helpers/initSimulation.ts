import { simulationMode } from '../types/SimulationSave'
import { baseSave } from '../constants'
import { cloneState } from './cloneState'
import { saveStore } from '../stores/saveStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'

export const initSimulation = (name: string, mode: simulationMode) => {
    const state = cloneState(baseSave)

    state.simulation.name = name
    state.simulation.mode = mode

    saveStore.set(name, state)

    toast.success(
        ...createToastArguments(
            `Successfully created simulation ${name}`,
            'check'
        )
    )

    return state
}
