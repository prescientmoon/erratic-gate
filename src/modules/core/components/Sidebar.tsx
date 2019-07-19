import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            padding: '4px',
            width: drawerWidth,
            background: `#111111`
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-start'
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
                <Button variant={'contained'} color="primary">
                    New Simulation
                </Button>
            </Drawer>
        </div>
    )
}

export default Sidebar
