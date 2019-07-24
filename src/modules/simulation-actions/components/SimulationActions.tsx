import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { SidebarActions } from '../constants'

/**
 * Component wich contains the sidebar 'Simulation' button
 */
const SimulationActions = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const translation = useTranslation()

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <ListItem
                button
                onClick={event => {
                    setAnchorEl(event.currentTarget)
                }}
            >
                <ListItemIcon>
                    <Icon>insert_drive_file</Icon>
                </ListItemIcon>
                <ListItemText>{translation.sidebar.simulation}</ListItemText>
            </ListItem>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {Object.values(SidebarActions).map(
                    ({ icon, name, keybinding, action }, index) => {
                        return (
                            <MenuItem key={index} onClick={action}>
                                <ListItemIcon>
                                    <Icon>{icon}</Icon>
                                </ListItemIcon>

                                <ListItemText
                                    primary={name}
                                    secondary={(keybinding || []).join(' + ')}
                                />
                            </MenuItem>
                        )
                    }
                )}
            </Menu>
        </>
    )
}

export default SimulationActions
