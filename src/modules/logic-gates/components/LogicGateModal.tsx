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
import { completeTemplate } from '../helpers/completeTemplate'
import { gateIcons } from '../constants'

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

                const template = completeTemplate(templateStore.get(gate) || {})

                if (!template) {
                    throw new SimulationError(
                        `Template ${gate} cannot be found`
                    )
                }

                return (
                    <div
                        key={index}
                        className="logic-gate-item"
                        onClick={e => {
                            addGate(renderer.simulation, gate)
                        }}
                    >
                        <Icon className="lgi-icon logic-gate-item-type">
                            {gateIcons[template.tags[0]]}
                        </Icon>
                        <Typography className="logic-gate-item-name">
                            {gate}
                        </Typography>
                        {template.info.length && (
                            <a
                                target="_blank"
                                className="logic-gate-item-info"
                                href={randomItem(template.info)}
                                onClick={e => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                }}
                            >
                                <Icon className="lgi-icon">info</Icon>
                            </a>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default LogicGateModal
