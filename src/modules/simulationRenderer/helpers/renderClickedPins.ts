import { SimulationRenderer } from '../classes/SimulationRenderer'
import { getPinPosition } from './pinPosition'
import { SelectedPin } from '../types/SelectedPins'

export const renderClickedPins = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer
) => {
    let pin: SelectedPin | null = null

    if (renderer.selectedPins.start) {
        pin = renderer.selectedPins.start
    } else if (renderer.selectedPins.end) {
        pin = renderer.selectedPins.end
    }

    if (pin) {
        const position = getPinPosition(renderer, pin.transform, pin.wrapper)

        ctx.strokeStyle = 'yellow'
        ctx.lineWidth = renderer.options.gates.pinRadius * 2
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(...position)
        ctx.lineTo(...renderer.lastMousePosition)
        ctx.stroke()
    }
}
