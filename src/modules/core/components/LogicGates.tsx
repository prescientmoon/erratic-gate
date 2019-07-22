import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { open } from '../../logic-gates/components/LogicGateModal'
import { updateLogicGateList } from '../../logic-gates/subjects/LogicGateList'

/**
 * Component wich contains the sidebar 'Open simulation' button
 *
 * @throws SimulationError if the data about a simulation cant be found in localStorage
 */
const LogicGates = () => {
    const translation = useTranslation()

    return (
        <ListItem
            button
            onClick={() => {
                updateLogicGateList()
                open.next(true)
            }}
        >
            <ListItemIcon>
                <Icon>memory</Icon>
            </ListItemIcon>
            <ListItemText>{translation.sidebar.logicGates}</ListItemText>
        </ListItem>
    )
}

export default LogicGates
