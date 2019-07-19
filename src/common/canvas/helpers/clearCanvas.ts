import { SimulationRenderer } from '../../../modules/simulationRenderer/classes/SimulationRenderer'
import { Screen } from '../../../modules/core/classes/Screen'

const screen = new Screen()

export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, screen.x, screen.y)
}
