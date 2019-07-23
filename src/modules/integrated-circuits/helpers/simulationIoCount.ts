import { GateState } from '../../saving/types/SimulationSave'
import { GateTemplate } from '../../simulation/types/GateTemplate'
import { templateStore } from '../../saving/stores/templateStore'

/**
 * Any type of gate wich has a template
 */
export type hasTemplate = { template: string }

/**
 * Counts the number of ic inputs inside an array of gate states
 *
 * @param gates The state to count the inputs in
 */
export const simulationInputCount = (gates: hasTemplate[]) => {
    return gates.filter(gate => {
        const template = templateStore.get(gate.template)

        return template && template.integration && template.integration.input
    }).length
}

/**
 * Counts the number of ic outputs inside an array of gate states
 *
 * @param gates The state to count the outputs for
 */
export const simulationOutputCount = (gates: hasTemplate[]) => {
    return gates.filter(gate => {
        const template = templateStore.get(gate.template)

        return template && template.integration && template.integration.output
    }).length
}
