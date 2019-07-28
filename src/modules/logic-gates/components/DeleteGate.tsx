import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { LogicGateProps } from '../types/LogicGateProps'
import { deleteGateFromMemory } from '../../simulation-actions/helpers/deleteSimulation'
import { getRendererSafely } from '../helpers/getRendererSafely'

const DeleteGateIcon = ({ template }: LogicGateProps) => {
    if (template.tags.includes('base')) {
        return <></>
    } else {
        return (
            <IconButton
                aria-label="delete"
                onClick={() =>
                    deleteGateFromMemory(
                        getRendererSafely(),
                        template.metadata.name
                    )
                }
            >
                <Icon>delete</Icon>
            </IconButton>
        )
    }
}

export default DeleteGateIcon
