import { Gate, PinWrapper } from '../../simulation/classes/Gate'
import {
    TransformState,
    CameraState,
    SimulationState
} from '../types/SimulationSave'
import { Transform } from '../../../common/math/classes/Transform'
import { Camera } from '../../simulationRenderer/classes/Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Wire } from '../../simulation/classes/Wire'
import { templateStore } from '../stores/templateStore'

/**
 * Contains methods for transforming saved state into the respective class instances
 */

export const fromTransformState = (state: TransformState): Transform => {
    return new Transform(state.position, state.scale, state.rotation)
}

export const fromCameraState = (state: CameraState): Camera => {
    const camera = new Camera()

    camera.transform = fromTransformState(state.transform)

    return camera
}

export const fromSimulationState = (state: SimulationState): Simulation => {
    const simulation = new Simulation(state.mode, state.name)

    for (const gateState of state.gates) {
        const gate = new Gate(
            templateStore.get(gateState.template),
            gateState.id
        )
        gate.transform = fromTransformState(gateState.transform)

        simulation.push(gate)
    }

    for (const wireState of state.wires) {
        const startGateNode = simulation.gates.get(wireState.from.id)
        const endGateNode = simulation.gates.get(wireState.to.id)

        if (
            startGateNode &&
            endGateNode &&
            startGateNode.data &&
            endGateNode.data
        ) {
            const start: PinWrapper = {
                index: wireState.from.index,
                total: wireState.from.total,
                value: startGateNode.data._pins.outputs[wireState.from.index]
            }
            const end: PinWrapper = {
                index: wireState.to.index,
                total: wireState.to.total,
                value: endGateNode.data._pins.inputs[wireState.to.index]
            }

            const wire = new Wire(start, end, wireState.id)

            simulation.wires.push(wire)
        }
    }

    return simulation
}
