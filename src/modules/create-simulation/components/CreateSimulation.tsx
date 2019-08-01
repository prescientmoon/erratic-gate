import React from 'react'
import './CreateSimulation.scss'
import { useObservable } from 'rxjs-hooks'
import { CreateSimulationStore } from '../stores/CreateSimulationStore'
import { simulationMode } from '../../saving/types/SimulationSave'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'

export interface CreateSimulationOption {
    mode: simulationMode
    icon: string
    id: string
}

export const createSimulationOptions: CreateSimulationOption[] = [
    {
        mode: 'project',
        icon: 'gamepad',
        id: 'create-project'
    },
    {
        icon: 'memory',
        mode: 'ic',
        id: 'create-ic'
    }
]

const CreateSimulation = () => {
    const open = useObservable(() => CreateSimulationStore.data.open, false)
    const translation = useTranslation()

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
                {translation.createSimulation.mode.question}
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
                        <div
                            className={`create-option-icon ${option.id}`}
                            id={option.id}
                        >
                            <Icon>{option.icon}</Icon>
                        </div>
                        <div className="create-option-name" id={option.mode}>
                            {
                                translation.createSimulation.mode.options[
                                    option.mode
                                ]
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateSimulation
