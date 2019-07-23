import { vector2 } from '../../../common/math/classes/Transform'

export interface PinCount {
    variable: boolean
    count: number
}

export interface Material {
    type: 'color' | 'image'
    value: string
}

export interface Shape {
    rounded: boolean
    radius: number
    scale: vector2
}

export type Enabled<T> =
    | {
          enabled: false
      }
    | ({
          enabled: true
      } & T)

export type TimePipe = Enabled<{
    time: number
}>

export type GateTag = 'base' | 'imported' | 'integrated'

export interface GateTemplate {
    material: Material
    shape: Shape
    pins: {
        inputs: PinCount
        outputs: PinCount
    }
    metadata: {
        name: string
    }
    code: {
        initialisation: string
        activation: string
        onClick: string
    }
    simulation: {
        throttle: TimePipe
        debounce: TimePipe
    }
    integration: {
        allowed: boolean
        input: boolean
        output: boolean
    }
    info: string[]
    tags: GateTag[]
}
