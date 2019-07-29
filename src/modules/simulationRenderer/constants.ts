import { SimulationRendererOptions } from './types/SimulationRendererOptions'
import { vector2 } from '../../common/math/classes/Transform'
import { mouseButton } from '../core/types/mouseButton'
import { KeyboardInput } from '../keybindings/classes/KeyboardInput'

export const defaultSimulationRendererOptions: SimulationRendererOptions = {
    dnd: {
        rotation: Math.PI / 12 // 7.5 degrees
    },
    gates: {
        connectionLength: 30,
        pinRadius: 10,
        pinStrokeColor: '#888888',
        pinStrokeWidth: 3,
        pinFill: {
            open: 'rgb(255,216,20)',
            closed: 'rgb(90,90,90)'
        },
        gateStroke: {
            active: 'yellow',
            normal: 'black',
            width: 4
        }
    },
    wires: {
        temporaryWireColor: `rgba(128,128,128,0.5)`,
        curvePointOffset: 100
    },
    spawning: {
        spawnOffset: 30
    },
    selecting: {
        fill: 'rgba(128,128,128,0.3)',
        stroke: `rgba(128,128,128,0.7)`
    }
}

export const imageQuality: vector2 = [100, 100]

export const mouseButtons: Record<
    'zoom' | 'pan' | 'drag' | 'select' | 'unselect',
    mouseButton
> = {
    zoom: 1,
    drag: 0,
    pan: 2,
    select: 0,
    unselect: 0
}

export const shiftInput = new KeyboardInput('shift')
