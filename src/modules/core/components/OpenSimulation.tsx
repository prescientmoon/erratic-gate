import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { saveStore } from '../../saving/stores/saveStore'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { switchTo } from '../../saving/helpers/switchTo'
import { SimulationError } from '../../errors/classes/SimulationError'
import { icons } from '../constants'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { getTemplateSafely } from '../../logic-gates/helpers/getTemplateSafely'
import { getRendererSafely } from '../../logic-gates/helpers/getRendererSafely'

/**
 * Returns a list with the names of all saved simulations
 */
const allSimulations = () => {
    return saveStore.ls()
}

/**
 * Subject to make React update the dom when new simulations are stored
 */
const allSimulationSubject = new BehaviorSubject<string[]>([])

/**
 * Triggers a dom update by pushing a new value to the
 * useObservable hook inside the React component.
 *
 * It also has the side effect of sorting the simulation names.
 */
export const updateSimulationList = () => {
    allSimulationSubject.next(allSimulations().sort())
}

/**
 * Component wich contains the sidebar 'Open simulation' button
 *
 * @throws SimulationError if the data about a simulation cant be found in localStorage
 */
const OpenSimulation = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const simulations = useObservable(() => allSimulationSubject, [])

    const translation = useTranslation()

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <ListItem
                button
                onClick={event => {
                    updateSimulationList()
                    setAnchorEl(event.currentTarget)
                }}
            >
                <ListItemIcon>
                    <Icon>folder_open</Icon>
                </ListItemIcon>
                <ListItemText>
                    {translation.sidebar.openSimulation}
                </ListItemText>
            </ListItem>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {simulations
                    .filter(
                        name =>
                            simulations.length < 2 ||
                            name !== getRendererSafely().simulation.name
                    )
                    .map((simulationName, index) => {
                        const simulationData = saveStore.get(simulationName)

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
                                <ListItemIcon>
                                    <Icon>
                                        {
                                            icons.simulationMode[
                                                simulationData.simulation.mode
                                            ]
                                        }
                                    </Icon>
                                </ListItemIcon>
                                <Typography style={{ flexGrow: 1 }}>
                                    {simulationName}
                                </Typography>
                            </MenuItem>
                        )
                    })}
            </Menu>
        </>
    )
}

export default OpenSimulation
