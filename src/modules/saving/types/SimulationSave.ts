import { vector2 } from '../../../common/math/types/vector2'

export type simulationMode = 'ic' | 'project'

export interface TransformState {
    position: vector2
    scale: vector2
    rotation: number
}

export type PropsSave = {
    [K in string]: string | number | boolean | PropsSave
}

export interface GateState {
    transform: TransformState
    id: number
    template: string
    props: PropsSave
}

export interface CameraState {
    transform: TransformState
}

export interface WireLimit {
    id: number
    index: number
    total: number
}

export interface WireState {
    from: WireLimit
    to: WireLimit
    id: number
}

export interface SimulationState {
    gates: GateState[]
    wires: WireState[]

    mode: simulationMode
    name: string
}

export interface RendererState {
    simulation: SimulationState
    camera: CameraState
}
