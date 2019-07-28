import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { LogicGateProps } from '../types/LogicGateProps'
import { addGateFromTemplate } from '../helpers/addGateFromTemplate'

const AddGate = ({ template }: LogicGateProps) => {
    return (
        <div className="gate-info-icon">
            <IconButton
                aria-label="add"
                onClick={() => {
                    addGateFromTemplate(template)
                }}
            >
                <Icon>add</Icon>
            </IconButton>
        </div>
    )
}

export default AddGate
