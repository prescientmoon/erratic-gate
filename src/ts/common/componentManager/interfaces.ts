import { ComponentState, materialMode } from "../component/interfaces";
import { WireState } from "../wires/interface";

export interface ManagerState {
    components: ComponentState[]
    scale: [number,number]
    position: [number,number]
    wires: WireState
}

export interface ComponentTemplate {
    name: string
    version: string
    activation: string
    onclick?: string
    inputs: number
    outputs: number
    material: {
        mode: materialMode
        data: string
    }
}