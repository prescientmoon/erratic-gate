import { SimulationRenderer } from '../classes/SimulationRenderer'
import { pinFill } from './pinFill'
import { getPinPosition } from './pinPosition'
import { Wire } from '../../simulation/classes/Wire'
import { wireRadius } from './wireRadius'

export const renderWires = (
    ctx: CanvasRenderingContext2D,
    renderer: SimulationRenderer,
    wire: Wire
) => {
    const { start, end } = wire
    const startPosition = getPinPosition(
        renderer,
        start.value.gate.transform,
        start
    )
    const endPosition = getPinPosition(renderer, end.value.gate.transform, end)
    const length = renderer.options.wires.curvePointOffset
    const centerY = (startPosition[1] + endPosition[1]) / 2
    const controlPostions = [startPosition[0] + length, endPosition[0] - length]

    ctx.strokeStyle = pinFill(renderer, start.value)
    ctx.lineWidth = wireRadius(renderer)
    ctx.lineCap = 'round'

    ctx.beginPath()
    ctx.moveTo(...startPosition)

    if (startPosition[0] < endPosition[0]) {
        ctx.bezierCurveTo(
            controlPostions[0],
            startPosition[1],
            controlPostions[1],
            endPosition[1],
            ...endPosition
        )
    } else {
        const { abs, PI } = Math

        const baseFactor = startPosition[1] < endPosition[1] ? 1 : -1
        const factors = [baseFactor, baseFactor]

        const radiuses = [...Array(2)].fill(
            abs((centerY - startPosition[1]) / 2)
        )

        const limit = 70
        if (radiuses[0] < limit) {
            factors[0] *= -1
            radiuses[0] = limit
            radiuses[1] = abs(
                (startPosition[1] +
                    factors[0] * 2 * radiuses[0] -
                    endPosition[1]) /
                    2
            )
        }

        const centerPosition = [
            startPosition[1] + factors[0] * radiuses[0],
            endPosition[1] - factors[1] * radiuses[1]
        ]

        ctx.arc(
            controlPostions[0],
            centerPosition[0],
            radiuses[0],
            (-factors[0] * PI) / 2,
            (factors[0] * PI) / 2,
            factors[0] !== 1
        )

        ctx.lineTo(
            controlPostions[1],
            endPosition[1] - factors[1] * 2 * radiuses[1]
        )

        ctx.arc(
            controlPostions[1],
            centerPosition[1],
            radiuses[1],
            (-factors[1] * PI) / 2,
            (factors[1] * PI) / 2,
            factors[1] === 1
        )

        ctx.lineTo(...endPosition)
    }

    ctx.stroke()
}
