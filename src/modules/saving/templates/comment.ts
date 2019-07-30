import { PartialTemplate } from '../types/PartialTemplate'

/**
 * The template of the comment gate
 */
const commentTemplate: PartialTemplate = {
    metadata: {
        name: 'comment'
    },
    pins: {
        inputs: {
            count: 0
        },
        outputs: {
            count: 0
        }
    },
    material: {
        fill: '#007A72'
    },
    shape: {
        scale: [300, 100]
    },
    code: {
        activation: `
            context.innerText(context.getProperty('content'))
        `
    },
    info: ['https://en.wikipedia.org/wiki/Comment_(computer_programming)'],
    properties: {
        enabled: true,
        data: [
            {
                needsUpdate: true,
                base: 'Your comment here',
                name: 'content',
                type: 'string'
            }
        ]
    },
    innerText: {
        enabled: true,
        color: '#ADFFFA'
    }
}

export default commentTemplate
