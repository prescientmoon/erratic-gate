import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { LogicGateProps } from './LogicGate'
import { randomItem } from '../../internalisation/helpers/randomItem'

const GateInfo = ({ template }: LogicGateProps) => {
    const info = template.info

    if (info.length === 0) {
        return <></>
    } else {
        return (
            <div className="gate-info-icon">
                <a href={randomItem(info)} target="blank">
                    <IconButton aria-label="info">
                        <Icon>info</Icon>
                    </IconButton>
                </a>
            </div>
        )
    }
}

export default GateInfo
