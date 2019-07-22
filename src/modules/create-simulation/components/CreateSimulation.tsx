import React from 'react'
import './CreateSimulation.scss'
import { useObservable } from 'rxjs-hooks'
import { CreateSimulationStore } from '../stores/CreateSimulationStore'
import { simulationMode } from '../../saving/types/SimulationSave'
import Icon from '@material-ui/core/Icon'

export interface CreateSimulationOption {
    mode: simulationMode
    icon: string
    name: string
}

export const createSimulationOptions: CreateSimulationOption[] = [
    {
        name: 'project',
        mode: 'project',
        icon: 'gamepad'
    },
    {
        name: 'integrated circuit',
        icon: 'memory',
        mode: 'ic'
    }
]

const CreateSimulation = () => {
    const open = useObservable(() => CreateSimulationStore.data.open, false)

    const closeModal = () => {
        CreateSimulationStore.actions.next('quit')
    }

    return (
        <div
            className={open ? 'shown' : ''}
            id="create-content"
            onClick={closeModal}
        >
            <div id="create-title">
                What kind of simulation do you want to create?
            </div>

            <div id="create-options">
                {createSimulationOptions.map((option, index) => (
                    <div
                        key={index}
                        className="create-option"
                        onClick={e => {
                            e.stopPropagation()

                            CreateSimulationStore.data.output.next(option.mode)
                            CreateSimulationStore.actions.next('submit')
                        }}
                    >
                        <div className="create-option-icon">
                            <Icon>{option.icon}</Icon>
                        </div>
                        <div className="create-option-name" id={option.mode}>
                            {option.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateSimulation
