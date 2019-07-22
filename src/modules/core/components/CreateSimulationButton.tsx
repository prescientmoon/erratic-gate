import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { handleCreating } from '../../create-simulation/helpers/handleCreating'
import { useTranslation } from '../../internalisation/helpers/useLanguage'

/**
 * The component for the 'Create simulation' button from the top of the sidebar.
 *
 * The only way i found to apply a different color to the ListItem button was
 * by using !important in the scss.
 */
const CreateSimulationButton = () => {
    const translation = useTranslation()

    return (
        <ListItem button className="contained" onClick={handleCreating}>
            <ListItemIcon>
                <Icon>note_add</Icon>
            </ListItemIcon>
            <ListItemText>{translation.sidebar.createSimulation}</ListItemText>
        </ListItem>
    )
}

export default CreateSimulationButton
