import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import { useTranslation } from '../../internalisation/helpers/useLanguage'
import { Link, Route } from 'react-router-dom'

const linkButton = (to: string, text: string, contained = true) => {
    const a = 'arrow_back_ios'
    return (
        <Link to={to}>
            <ListItem button className={contained ? 'contained' : ''}>
                <ListItemIcon>
                    <Icon>
                        {contained ? 'device_hub' : 'keyboard_arrow_left'}
                    </Icon>
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </ListItem>
        </Link>
    )
}

const BackToSimulation = () => {
    const translation = useTranslation()

    return (
        <>
            {linkButton('/', translation.sidebar.backToSimulation)}
            <Route
                path="/info/:name"
                component={() => {
                    return linkButton(
                        '/gates',
                        translation.sidebar.backToGates,
                        false
                    )
                }}
            />
        </>
    )
}

export default BackToSimulation
