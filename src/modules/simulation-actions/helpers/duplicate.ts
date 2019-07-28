import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { copy } from './copy'
import { paste } from './paste'

export const duplicate = (renderer: SimulationRenderer) => {
    const { clipboard, wireClipboard } = renderer

    copy(renderer)
    paste(renderer)

    renderer.clipboard = clipboard
    renderer.wireClipboard = wireClipboard
}
