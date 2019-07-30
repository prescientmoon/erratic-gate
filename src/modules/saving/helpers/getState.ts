import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { Gate, PinWrapper } from '../../simulation/classes/Gate'
import {
    GateState,
    TransformState,
    RendererState,
    CameraState,
    SimulationState,
    WireState,
    WireLimit
} from '../types/SimulationSave'
import { Transform } from '../../../common/math/classes/Transform'
import { Camera } from '../../simulationRenderer/classes/Camera'
import { Simulation } from '../../simulation/classes/Simulation'
import { Wire } from '../../simulation/classes/Wire'

/**
 * Methods for gettings the savable state from class instances
 */

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

export const getWireLimit = (pin: PinWrapper): WireLimit => {
    return {
        id: pin.value.gate.id,
        index: pin.index,
        total: pin.total
    }
}

export const getWireState = (wire: Wire): WireState => {
    return {
        from: getWireLimit(wire.start),
        to: getWireLimit(wire.end),
        id: wire.id
    }
}

export const getSimulationState = (simulation: Simulation): SimulationState => {
    return {
        gates: Array.from(simulation.gates).map(getGateState),
        wires: simulation.wires.map(getWireState),
        mode: simulation.mode,
        name: simulation.name
    }
}

export const getGateState = (gate: Gate): GateState => {
    return {
        id: gate.id,
        template: gate.template.metadata.name,
        transform: getTransformState(gate.transform),
        props: gate.getProps()
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
