import React from 'react'
import Icon from '@material-ui/core/Icon'
import { LogicGateProps } from '../types/LogicGateProps'

const GateSettings = ({ template }: LogicGateProps) => {
    const tags = template.tags

    if (tags.includes('base')) {
        return <></>
    } else {
        return (
            <div className="gate-info-icon">
                <Icon>settings</Icon>
            </div>
        )
    }
}

export default GateSettings
