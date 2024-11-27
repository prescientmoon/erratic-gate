import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the button gate
 */
const constTemplate: PartialTemplate = {
  metadata: {
    name: 'constant'
  },
  material: {
    fill: '#673AB7',
    stroke: {
      normal: '#EDC6FB'
    }
  },
  code: {
    activation: `
      const state = context.getProperty('value')
      const bits = context.getProperty('output bits')
      const length = state.toString(2).length
      const text = length > 10
        ? "0x" + context.printHex(state, Math.ceil(length/4))
        : context.printBinary(state, length)

      context.setBinary(0, state, bits === 0 ? length : bits)
      context.innerText(text)
    `
  },
  pins: {
    inputs: {
      count: 0
    }
  },
  integration: {
    input: true
  },
  info: [],
  properties: {
    enabled: true,
    data: [
      {
        base: 0,
        name: 'output bits',
        description: '(0 for auto)',
        type: 'number',
        needsUpdate: true
      },
      {
        base: 0,
        name: 'value',
        type: 'number',
        needsUpdate: true
      }
    ]
  },
  category: categories.io
}

export default constTemplate
