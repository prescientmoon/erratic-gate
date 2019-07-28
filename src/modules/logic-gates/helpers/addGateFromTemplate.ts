import { GateTemplate } from '../../simulation/types/GateTemplate'
import { addGate } from '../../simulation/helpers/addGate'
import { getRendererSafely } from './getRendererSafely'

/**
 * Adds a gate to the current simulation from its template
 *
 * @param template The template to create
 */
export const addGateFromTemplate = (template: GateTemplate) => {
    addGate(getRendererSafely(), template.metadata.name)
}
