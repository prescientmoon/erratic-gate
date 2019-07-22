import { ToastOptions } from 'react-toastify'
import React from 'react'
import ToastContent from '../components/ToastContent'

export const createToastArguments = (
    message: string,
    icon?: string
): [string | JSX.Element, ToastOptions] => [
    icon ? <ToastContent message={message} icon={icon} /> : message,
    {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }
]
