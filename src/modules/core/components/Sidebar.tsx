import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { handleCreating } from '../../create-simulation/helpers/handleCreating'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import OpenSimulation from './OpenSimulation'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            zIndex: 5
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 5
        },
        drawerPaper: {
            padding: '4px',
            width: drawerWidth,
            background: `#111111`,
            zIndex: 5
        }
    })
)

const Sidebar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={true}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <List component="nav" aria-label="Main mailbox folders">
                    <ListItem
                        button
                        className="contained"
                        onClick={handleCreating}
                    >
                        <ListItemIcon>
                            <Icon>note_add</Icon>
                        </ListItemIcon>
                        <ListItemText>Create simulation</ListItemText>
                    </ListItem>
                    <OpenSimulation />
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar
