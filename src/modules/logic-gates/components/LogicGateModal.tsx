import './LogicGateModal.scss'
import React from 'react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { LogicGateList } from '../subjects/LogicGateList'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { addGate } from '../../simulation/helpers/addGate'
import { randomItem } from '../../internalisation/helpers/randomItem'
import { gateIcons } from '../constants'
import { getTemplateSafely } from '../helpers/getTemplateSafely'
import { getRendererSafely } from '../helpers/getRendererSafely'

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
    const renderer = getRendererSafely()

    return (
        <div
            className={openSnapshot ? 'visible' : ''}
            id="logic-gate-modal-container"
            onClick={handleClose}
        >
            <div className="logic-gate-item">---</div>
            {gates
                .map(getTemplateSafely)
                .filter(template => {
                    return (
                        renderer.simulation.mode === 'project' ||
                        template.metadata.name !== renderer.simulation.name
                    )
                })
                .map((template, index) => {
                    const { name } = template.metadata

                    return (
                        <div
                            key={index}
                            className="logic-gate-item"
                            onClick={() => {
                                addGate(renderer.simulation, name)
                            }}
                        >
                            <Icon className="lgi-icon logic-gate-item-type">
                                {gateIcons[template.tags[0]]}
                            </Icon>
                            <Typography className="logic-gate-item-name">
                                {name}
                            </Typography>
                            {template.info.length ? (
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
                            ) : (
                                ''
                            )}
                        </div>
                    )
                })}
        </div>
    )
}

export default LogicGateModal
