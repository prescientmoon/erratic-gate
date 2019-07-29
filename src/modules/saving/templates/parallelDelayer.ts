import { PartialTemplate } from '../types/PartialTemplate'
import { delayProperties } from '../data/delayProperties'

/**
 * The template of the parallelDelayer gate
 */
const parallelDelayerTemplate: PartialTemplate = {
    metadata: {
        name: 'Parallel delayer'
    },
    material: {
        type: 'image',
        fill: require('../../../assets/parallel')
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
    properties: delayProperties
}

export default parallelDelayerTemplate
