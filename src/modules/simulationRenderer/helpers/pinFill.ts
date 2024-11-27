import { Pin } from '../../simulation/classes/Pin'
import { SimulationRenderer } from '../classes/SimulationRenderer'
import { fromHexColorString, fromChunks } from '../../colors/helpers/fromHex'

export const pinFill = (renderer: SimulationRenderer, pin: Pin) => {
  let color = 'rgba(0,0,0,0)'

  if (pin.pairs.size) {
    const { open, closed } = renderer.options.gates.pinFill
    const digits = Array.from(pin.state.value).map(Number)

    const colors = digits.map((digit) => (digit ? open : closed))
    const chunked = colors.map(fromHexColorString)

    const summed = [0, 1, 2]
      .map((key) =>
        chunked
          .flat()
          .filter((_v, index) => index % 3 === key)
          .reduce((acc, curr) => acc + curr, 0)
      )
      .map((value) => Math.floor(value / digits.length))

    color = fromChunks(summed)
  }

  return color
}
