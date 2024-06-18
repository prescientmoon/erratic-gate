import { PartialTemplate } from '../types/PartialTemplate'
import { delayProperties } from '../data/delayProperties'
import { categories } from '../data/categories'

/**
 * The template of the parallelDelayer gate
 */
const parallelDelayerTemplate: PartialTemplate = {
    metadata: {
        name: 'parallel delayer'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/parallel.svg')
    },
    code: {
        activation: `
            const i = context.get(0)
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res()
                }, context.getProperty('delay'))
            }).then(() => {
                context.set(0,i)
            })
        `
    },
    properties: delayProperties,
    category: categories.time
}

export default parallelDelayerTemplate
