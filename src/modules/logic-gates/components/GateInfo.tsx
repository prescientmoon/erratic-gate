import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { LogicGateProps } from '../types/LogicGateProps'
import { randomItem } from '../../internalisation/helpers/randomItem'
import { Link } from 'react-router-dom'

const GateInfo = ({ name }: { name: string }) => {
    return (
        <div className="gate-info-icon">
            <Link to={`/info/${name}`}>
                <IconButton aria-label="info">
                    <Icon>info</Icon>
                </IconButton>
            </Link>
        </div>
    )
}

export default GateInfo
