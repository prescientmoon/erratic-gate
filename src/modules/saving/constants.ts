import { GateTemplate } from '../simulation/types/GateTemplate'
import { RendererState } from './types/SimulationSave'
import andTemplate from './templates/and'
import buttonTemplate from './templates/button'
import lightTemplate from './templates/light'
import nandTemplate from './templates/nand'
import norTemplate from './templates/nor'
import notTemplate from './templates/not'
import orTemplate from './templates/or'
import parallelDelayerTemplate from './templates/parallelDelayer'
import rgbLightTemplate from './templates/rgb'
import sequentialDelayerTemplate from './templates/sequentialDelayer'
import xnorTemplate from './templates/xnor'
import xorTemplate from './templates/xor'

export const defaultSimulationName = 'default'
export const baseTemplates: DeepPartial<GateTemplate>[] = [
    andTemplate,
    buttonTemplate,
    lightTemplate,
    nandTemplate,
    norTemplate,
    notTemplate,
    orTemplate,
    parallelDelayerTemplate,
    rgbLightTemplate,
    sequentialDelayerTemplate,
    xnorTemplate,
    xorTemplate
]

export const baseSave: RendererState = {
    camera: {
        transform: {
            position: [0, 0],
            scale: [1, 1],
            rotation: 0
        }
    },
    simulation: {
        gates: [],
        mode: 'project',
        wires: [],
        name: 'default'
    }
}
