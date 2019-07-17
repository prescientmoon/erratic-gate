import { vector2 } from '../../../common/math/classes/Transform'

export interface TransformState {
    position: vector2
    scale: vector2
    rotation: number
}

export interface GateState {
    transform: TransformState
    id: number
    template: string
}

export interface CameraState {
    transform: TransformState
}

export interface SimulationState {
    gates: GateState[]
}

export interface RendererState {
    simulation: SimulationState
    camera: CameraState
}
