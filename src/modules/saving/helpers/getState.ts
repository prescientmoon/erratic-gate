import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { Gate } from '../../simulation/classes/Gate'
import {
    GateState,
    TransformState,
    RendererState,
    CameraState,
    SimulationState
} from '../types/SimulationSave'
import { Transform } from '../../../common/math/classes/Transform'
import { Camera } from '../../simulationRenderer/classes/Camera'
import { Simulation } from '../../simulation/classes/Simulation'

export const getTransformState = (transform: Transform): TransformState => {
    return {
        position: transform.position,
        rotation: transform.rotation,
        scale: transform.scale
    }
}

export const getCameraState = (camera: Camera): CameraState => {
    return {
        transform: getTransformState(camera.transform)
    }
}

export const getSimulationState = (simulation: Simulation): SimulationState => {
    return {
        gates: Array.from(simulation.gates).map(getGateState)
    }
}

export const getGateState = (gate: Gate): GateState => {
    return {
        id: gate.id,
        template: gate.template.metadata.name,
        transform: getTransformState(gate.transform)
    }
}

export const getRendererState = (
    renderer: SimulationRenderer
): RendererState => {
    return {
        camera: getCameraState(renderer.camera),
        simulation: getSimulationState(renderer.simulation)
    }
}
