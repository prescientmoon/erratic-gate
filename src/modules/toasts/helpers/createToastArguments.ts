import { ToastOptions } from 'react-toastify'

export const createToastArguments = (
    message: string
): [string, ToastOptions] => [
    message,
    {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }
]
