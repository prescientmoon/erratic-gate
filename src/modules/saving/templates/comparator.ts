import { PartialTemplate } from '../types/PartialTemplate'
import { categories } from '../data/categories'

/**
 * The template of the comparator gate
 */
const comparatorTemplate: PartialTemplate = {
  metadata: {
    name: 'comparator'
  },
  info: ['https://www.technobyte.org/comparator/'],
  category: categories.math,
  code: {
    activation: `
      const a = context.getBinary(0)
      const b = context.getBinary(1)

      context.setBinary(0, Number(a > b), 1)
      context.setBinary(1, Number(a === b), 1)
      context.setBinary(2, Number(a < b), 1)
    `
  },
  pins: {
    inputs: {
      count: 2
    },
    outputs: {
      count: 3
    }
  },
  material: {
    type: 'image',
    fill: require('../../../assets/comparator.svg')
  },
  shape: {
    scale: [125, 125]
  }
}

export default comparatorTemplate
