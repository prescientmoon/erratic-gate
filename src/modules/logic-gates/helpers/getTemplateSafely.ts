import { templateStore } from '../../saving/stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { completeTemplate } from './completeTemplate'

/**
 * Gets a gate template from localStorage
 *
 * @param name - The name of the template
 *
 * @throws SimulationError if the template cant be found
 */
export const getTemplateSafely = (name: string) => {
    const template = completeTemplate(templateStore.get(name) || {})

    if (!template) {
        throw new SimulationError(`Template ${name} cannot be found`)
    }

    return template
}
