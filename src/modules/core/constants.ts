import { createMuiTheme } from '@material-ui/core/styles'
import { red, deepPurple } from '@material-ui/core/colors'

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: deepPurple,
        secondary: red
    }
})
