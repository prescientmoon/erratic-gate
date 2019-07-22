import './LogicGateModal.scss'
import React from 'react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { LogicGateList } from '../subjects/LogicGateList'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { addGate } from '../../simulation/helpers/addGate'
import { rendererSubject } from '../../core/subjects/rendererSubject'
import { SimulationError } from '../../errors/classes/SimulationError'
import { templateStore } from '../../saving/stores/templateStore'
import { randomItem } from '../../internalisation/helpers/randomItem'

/**
 * Subject containing the open state of the modal
 */
export const open = new BehaviorSubject(false)

/**
 * helper to close the modal
 */
export const handleClose = () => {
    open.next(false)
}

/**
 * The component containing the info / actions about all logic gates
 */
const LogicGateModal = () => {
    const openSnapshot = useObservable(() => open, false)
    const gates = useObservable(() => LogicGateList, [])

    return (
        <div
            className={openSnapshot ? 'visible' : ''}
            id="logic-gate-modal-container"
            onClick={handleClose}
        >
            {gates.map((gate, index) => {
                const renderer = rendererSubject.value

                if (!renderer) {
                    throw new SimulationError(`Renderer not found`)
                }

                const template =
                    gate.source === 'base' ? templateStore.get(gate.name) : ''

                if (gate.source === 'base' && !template) {
                    throw new SimulationError(
                        `Template ${gate.name} cannot be found`
                    )
                }

                return (
                    <div
                        key={index}
                        className="logic-gate-item"
                        onClick={e => {
                            addGate(renderer.simulation, gate.name)
                        }}
                    >
                        <Icon className="lgi-icon logic-gate-item-type">
                            {gate.source === 'base' ? 'sd_storage' : 'memory'}
                        </Icon>
                        <Typography className="logic-gate-item-name">
                            {gate.name}
                        </Typography>
                        {template && template.info && template.info.length && (
                            <a
                                target="_blank"
                                className="logic-gate-item-info"
                                href={randomItem(template.info)}
                            >
                                <Icon className="lgi-icon">info</Icon>
                            </a>
                        )}
                        {gate.source === 'ic' && (
                            <Icon className="lgi-icon logic-gate-item-delete">
                                delete
                            </Icon>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default LogicGateModal
