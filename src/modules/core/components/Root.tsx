import React from 'react'
import Canvas from './Canvas'
import CreateSimulation from '../../create-simulation/components/CreateSimulation'
import Input from '../../input/components/Input'
import GateProperties from '../../logic-gates/components/GatePropertiesModal'

const Root = () => {
    return (
        <>
            <Canvas />
            <CreateSimulation />
            <GateProperties />
            <Input />
        </>
    )
}

export default Root
