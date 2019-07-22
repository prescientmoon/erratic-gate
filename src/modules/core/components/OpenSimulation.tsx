import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import { saveStore } from '../../saving/stores/saveStore'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { rendererSubject } from '../subjects/rendererSubject'
import { currentStore } from '../../saving/stores/currentStore'

const allSimulations = () => {
    return saveStore.ls()
}
const allSimulationSubject = new BehaviorSubject<string[]>([])
const updateSimulationList = () => {
    allSimulationSubject.next(allSimulations())
}

const OpenSimulation = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const simulations = useObservable(() => allSimulationSubject, [])

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
                <ListItemText>Open simulation</ListItemText>
            </ListItem>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {simulations.map((simulation, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            if (rendererSubject.value) {
                                const renderer = rendererSubject.value

                                currentStore.set(simulation)
                                renderer.reloadSave()
                            }

                            handleClose()
                        }}
                    >
                        {simulation}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default OpenSimulation
