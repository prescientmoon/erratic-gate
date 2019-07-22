import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { switchTo } from '../../saving/helpers/switchTo'
import { SimulationError } from '../../errors/classes/SimulationError'
import { templateStore } from '../../saving/stores/templateStore'
import { useTranslation } from '../../internalisation/helpers/useLanguage'

/**
 * Subject to make React update the dom when new gates are stored
 */
const allGatesSubject = new BehaviorSubject<string[]>([])

/**
 * Triggers a dom update by pushing a new value to the
 * useObservable hook inside the React component.
 *
 * It also has the side effect of sorting the template names.
 */
const updateTemplateList = () => {
    allGatesSubject.next(templateStore.ls().sort())
}

/**
 * Component wich contains the sidebar 'Open simulation' button
 *
 * @throws SimulationError if the data about a simulation cant be found in localStorage
 */
const LogicGates = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const simulations = useObservable(() => allGatesSubject, [])

    const translation = useTranslation()

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <ListItem
                button
                onClick={event => {
                    updateTemplateList()
                    setAnchorEl(event.currentTarget)
                }}
            >
                <ListItemIcon>
                    <Icon>memory</Icon>
                </ListItemIcon>
                <ListItemText>{translation.sidebar.logicGates}</ListItemText>
            </ListItem>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {simulations.map((simulationName, index) => {
                    const simulationData = templateStore.get(simulationName)

                    if (!simulationData) {
                        throw new SimulationError(
                            `Cannot get data for simulation ${simulationName}`
                        )
                    }

                    return (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                switchTo(simulationName)
                                handleClose()
                            }}
                        >
                            <Typography>{simulationName}</Typography>
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
    )
}

export default LogicGates
