import React from 'react'
import Canvas from './Canvas'
import CreateSimulation from '../../create-simulation/components/CreateSimulation'
import Input from '../../input/components/Input'

const Root = () => {
    return (
        <>
            <Canvas />
            <CreateSimulation />
            <Input />
        </>
    )
}

export default Root
