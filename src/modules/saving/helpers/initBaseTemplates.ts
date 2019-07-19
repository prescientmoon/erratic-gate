import { baseTemplates } from '../constants'
import { templateStore } from '../stores/templateStore'

export const initBaseTemplates = () => {
    for (const template of baseTemplates) {
        if (template.metadata && template.metadata.name) {
            templateStore.set(template.metadata.name, template)
        }
    }
}
