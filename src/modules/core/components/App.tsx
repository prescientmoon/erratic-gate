import '../styles/reset'
import './App.scss'
import './Scrollbars.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { theme as muiTheme } from '../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from '@material-ui/styles/ThemeProvider'
import Sidebar from './Sidebar'
import Head from './Head'
import Root from './Root'
import LogicGatePage from '../../logic-gates/components/LogicGatesPage'
import { loadSubject } from '../subjects/loadedSubject'

const App = () => {
    useEffect(() => {
        loadSubject.next(true)
    })

    return (
        <>
            <Head />
            <CssBaseline />

            <Theme theme={muiTheme}>
                <Router>
                    <Sidebar />

                    <Route path="/" component={Root} exact />
                    <Route path="/gates" component={LogicGatePage} />
                </Router>
            </Theme>

            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    )
}

export default App
