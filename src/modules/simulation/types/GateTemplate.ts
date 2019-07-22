import { vector2 } from '../../../common/math/classes/Transform'

export interface PinCount {
    variable: boolean
    count: number
}

export interface Material {
    type: 'color'
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
        activation: string
        onClick: string
    }
    simulation: {
        throttle: TimePipe
        debounce: TimePipe
    }
    info: string[]
}
