import { vector2 } from '../../../common/math/types/vector2'

export interface PinCount {
  variable: boolean
  count: number
}

export type PropGroup<
  T extends boolean | number | string = boolean | number | string
> = {
  groupName: string
  props: Property<T>[]
}

export const isGroup = (prop: Property): prop is PropGroup =>
  (prop as PropGroup).groupName !== undefined

export type RawProp<
  T extends boolean | number | string = boolean | number | string
> = {
  type: 'number' | 'string' | 'text' | 'boolean'
  base: T
  name: string
  description?: string
  needsUpdate?: boolean
}
export type Property<
  T extends boolean | number | string = boolean | number | string
> = PropGroup<T> | RawProp<T>

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
  tags: GateTag[]
  properties: {
    enabled: boolean
    data: Property[]
  }
  innerText: {
    color: string
    enabled: boolean
  }
  category: number // for better sorting
  info: string[]
}
