import React from 'react'
import './ToastContent.scss'
import Icon from '@material-ui/core/Icon'

export interface ToastContentProps {
    message: string
    icon: string
}

const ToastContent = (props: ToastContentProps) => {
    return (
        <div className="toast-content-container">
            <Icon id="toast-content-icon">{props.icon}</Icon>
            <div id="toast-content-message">{props.message}</div>
        </div>
    )
}

export default ToastContent
