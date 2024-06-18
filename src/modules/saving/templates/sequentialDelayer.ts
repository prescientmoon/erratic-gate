import { PartialTemplate } from '../types/PartialTemplate'
import { delayProperties } from '../data/delayProperties'
import { categories } from '../data/categories'

/**
 * The template of the sequentialDelayer gate
 */
const sequentialDelayerTemplate: PartialTemplate = {
    metadata: {
        name: 'sequential delayer'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/sequential.svg')
    },
    code: {
        activation: `
            const i = context.get(0)
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res()
                },context.getProperty('delay'))
            }).then(() => {
                context.set(0,i)
            })
        `,
        async: true
    },
    properties: delayProperties,
    category: categories.time
}

export default sequentialDelayerTemplate
