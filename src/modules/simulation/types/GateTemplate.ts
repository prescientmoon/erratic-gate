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
}

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
}
