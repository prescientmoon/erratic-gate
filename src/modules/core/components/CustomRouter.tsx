import { BrowserRouter } from 'react-router-dom'
import { history } from '../constants'

export class CustomRouter extends BrowserRouter {
    public history = history
}
