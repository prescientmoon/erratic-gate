import '../styles/reset'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { theme as muiTheme } from '../constants'

import React from 'react'
import Canvas from './Canvas'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from '@material-ui/styles/ThemeProvider'
import Sidebar from './Sidebar'
import CreateSimulation from '../../create-simulation/components/CreateSimulation'
import Input from '../../input/components/Input'
import LogicGateModal from '../../logic-gates/components/LogicGateModal'

const App = () => {
    return (
        <>
            <Theme theme={muiTheme}>
                <CssBaseline />
                <Canvas />
                <Sidebar />
                <CreateSimulation />
                <Input />
                <LogicGateModal />
            </Theme>
            <CssBaseline />
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
