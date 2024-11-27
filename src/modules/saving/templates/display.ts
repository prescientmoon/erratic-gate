import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the display gate
 */
const displayTemplate: PartialTemplate = {
  metadata: {
    name: 'display'
  },
  material: {
    fill: '#673AB7',
    stroke: {
      normal: '#EDC6FB'
    }
  },
  code: {
    activation: `
      context.displayBinary(context.getBinary(0))
    `
  },
  pins: {
    outputs: {
      count: 0
    }
  },
  info: [],
  category: categories.io
}

export default displayTemplate
