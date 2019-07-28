import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { updateLogicGateList } from '../../logic-gates/subjects/LogicGateList'
import { Link } from 'react-router-dom'

/**
 * Component wich contains the sidebar 'Open simulation' button
 *
 * @throws SimulationError if the data about a simulation cant be found in localStorage
 */
const LogicGates = () => {
    const translation = useTranslation()

    return (
        <Link to="/gates">
            <ListItem
                button
                onClick={() => {
                    updateLogicGateList()
                }}
            >
                <ListItemIcon>
                    <Icon>memory</Icon>
                </ListItemIcon>
                <ListItemText>{translation.sidebar.logicGates}</ListItemText>
            </ListItem>
        </Link>
    )
}

export default LogicGates
