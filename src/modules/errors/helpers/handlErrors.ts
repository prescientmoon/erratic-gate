import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'

export const handleErrors = () => {
    window.onerror = (a, b, c, d, error) => {
        if (error) {
            const args = createToastArguments(error.toString())

            toast.error(...args)
        }

        console.log(a)
    }
}
