import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the light gate
 */
const lightTemplate: PartialTemplate = {
  metadata: {
    name: 'light bulb'
  },
  shape: {
    radius: 50
  },
  material: {
    fill: '#1C1C1C',
    stroke: {
      normal: '#3C3C3C'
    },
    colors: {
      active: '#C6FF00'
    }
  },
  code: {
    activation: `
      const { main, active } = context.colors

      context.color(context.getBinary(0) ? active : main)
    `
  },
  integration: {
    output: true
  },
  info: ['https://en.wikipedia.org/wiki/Incandescent_light_bulb'],
  pins: {
    outputs: {
      count: 0
    }
  },
  category: categories.io
}

export default lightTemplate
