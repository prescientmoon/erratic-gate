import { createMuiTheme } from '@material-ui/core/styles'
import { red, deepPurple } from '@material-ui/core/colors'
import { simulationMode } from '../saving/types/SimulationSave'
import { createBrowserHistory } from 'history'

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: deepPurple,
        secondary: red
    }
})

/**
 * Used to get intellisense from visual studio code
 */
export interface IconInterface {
    simulationMode: Record<simulationMode, string>
}

/**
 * Stores the names of icons reuseed truogh the app
 */
export const icons: IconInterface = {
    simulationMode: {
        project: 'gamepad',
        ic: 'memory'
    }
}

/**
 * The width of the sidebar
 */
export const sidebarWidth = 240

/**
 * The history to be used by the router
 */
export const history = createBrowserHistory()
