import { vector2 } from '../../../common/math/classes/Transform'
import { InputHTMLAttributes } from 'react'

export interface PinCount {
    variable: boolean
    count: number
}

export interface Property<T> {
    type: HTMLInputElement['type']
    encode: (value: string) => T
    base: T
}

export interface Material {
    type: 'color' | 'image'
    fill: string
    stroke: {
        active: string
        normal: string
    }
    colors: Record<string, string>
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
        async: boolean
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
    properties: Enabled<Record<Exclude<string, 'enabled'>, Property<unknown>>>
}
