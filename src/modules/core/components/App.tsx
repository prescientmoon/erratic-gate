import '../styles/reset'
import './App.scss'
import './Scrollbars.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { theme as muiTheme } from '../constants'
import { Route } from 'react-router-dom'

import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from '@material-ui/styles/ThemeProvider'
import Sidebar from './Sidebar'
import Root from './Root'
import LogicGatePage from '../../logic-gates/components/LogicGatesPage'
import { loadSubject } from '../subjects/loadedSubject'
import { CustomRouter } from './CustomRouter'
import LogicGateInfoPage from '../../logic-gate-info/components/LogicGateInfoPage'

const App = () => {
    useEffect(() => {
        loadSubject.next(true)
    })

    return (
        <>
            <CssBaseline />

            <Theme theme={muiTheme}>
                <CustomRouter>
                    <Sidebar />

                    <Route path="/" component={Root} exact />
                    <Route path="/gates" component={LogicGatePage} />
                    <Route path="/info/:name" component={LogicGateInfoPage} />
                </CustomRouter>
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
