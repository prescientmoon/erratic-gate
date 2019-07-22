import React from 'react'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemIconText from '@material-ui/core/ListItemText'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { nextLanguage } from '../../internalisation/helpers/nextLanguage'
import './Language.scss'

/**
 * The language component from the sidebar
 */
const Language = () => {
    const translation = useTranslation()

    return (
        <List>
            <ListItem button onClick={nextLanguage} id="language-button">
                <ListItemIcon>
                    <Icon>language</Icon>
                </ListItemIcon>
                <ListItemIconText>
                    {translation.sidebar.language}: {translation.language}
                </ListItemIconText>
            </ListItem>
        </List>
    )
}

export default Language
