import { baseTemplates } from '../constants'
import { templateStore } from '../stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'

/**
 * Stores the base logic gate templates into localStorage
 *
 * @throws SimulationError if something is wrong with the template
 */
export const initBaseTemplates = () => {
    for (const template of baseTemplates) {
        if (template.metadata && template.metadata.name) {
            templateStore.set(template.metadata.name, template)
        } else {
            throw new SimulationError(
                `Template ${JSON.stringify(template)} cannot be stored.`
            )
        }
    }
}
