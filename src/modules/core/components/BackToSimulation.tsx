import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { Link } from 'react-router-dom'

const BackToSimulation = () => {
    const translation = useTranslation()

    return (
        <Link to="/">
            <ListItem button className="contained">
                <ListItemIcon>
                    <Icon>arrow_back_ios</Icon>
                </ListItemIcon>
                <ListItemText>
                    {translation.sidebar.backToSimulation}
                </ListItemText>
            </ListItem>
        </Link>
    )
}

export default BackToSimulation
