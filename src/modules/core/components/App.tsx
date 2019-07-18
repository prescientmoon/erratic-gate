import React from 'react'
import '../styles/reset'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import Canvas from './Canvas'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <>
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
            <Canvas />
        </>
    )
}

export default App
