import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import OpenSimulation from './OpenSimulation'
import CreateSimulationButton from './CreateSimulationButton'
import LogicGates from './LogicGates'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Language from './Language'
import SimulationActions from '../../simulation-actions/components/SimulationActions'
import { Route, Switch } from 'react-router'
import BackToSimulation from './BackToSimulation'
import { sidebarWidth } from '../constants'

/**
 * The z-index of the sidebar.
 */
const sidebarZIndex = 5

/**
 * The styles for the sidebar component
 */
const useStyles = makeStyles(
    createStyles({
        // This class is applied on the sidebar container
        root: {
            display: 'flex',
            zIndex: sidebarZIndex
        },

        // This is the class of the actual sidebar
        drawer: {
            width: sidebarWidth,
            zIndex: sidebarZIndex,
            flexShrink: 0
        },

        // This is the class for the surface of the sidebar
        drawerPaper: {
            background: `#111111`,
            padding: '4px',
            width: sidebarWidth,
            zIndex: sidebarZIndex
        },

        // This is the class for the main button list
        list: {
            flexGrow: 1
        }
    })
)

/**
 * The sidebar component
 */
const Sidebar = () => {
    const classes = useStyles()

    const rootSidebarContent = () => {
        return (
            <>
                <CreateSimulationButton />
                <OpenSimulation />
                <LogicGates />
                <SimulationActions />
            </>
        )
    }
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant={'persistent'}
                anchor="right"
                open={true}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <List component="nav" className={classes.list}>
                    <Switch>
                        <Route path="/" exact component={rootSidebarContent} />
                        <Route path="*" component={BackToSimulation} />
                    </Switch>
                </List>

                <Language />
            </Drawer>
        </div>
    )
}

export default Sidebar
