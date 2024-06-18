import { SimulationState } from '../../saving/types/SimulationSave'
import { SimulationError } from '../../errors/classes/SimulationError'
import {
    GateTemplate,
    PropGroup,
    isGroup
} from '../../simulation/types/GateTemplate'
import {
    simulationInputCount,
    simulationOutputCount
} from './simulationIoCount'
import { templateStore } from '../../saving/stores/templateStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'
import { fromSimulationState } from '../../saving/helpers/fromState'
import { cleanSimulation } from '../../simulation-actions/helpers/clean'
import { getSimulationState } from '../../saving/helpers/getState'
import { categories } from '../../saving/data/categories'
import { getTemplateSafely } from '../../logic-gates/helpers/getTemplateSafely'

/**
 * Compiles a simulation into a logicGate
 *
 * @param simulaton The simulation to compile
 * @param log Allow disabling logging
 */
export const compileIc = (state: SimulationState, log = false) => {
    const { mode, name } = state

    if (mode === 'project') {
        throw new SimulationError('Cannot compile project')
    }

    const translation = CurrentLanguage.getTranslation()

    const simulation = fromSimulationState(state)
    cleanSimulation(simulation)
    const cleanState = getSimulationState(simulation)

    const inputCount = simulationInputCount(cleanState.gates)
    const outputCount = simulationOutputCount(cleanState.gates)

    const props = cleanState.gates.filter(({ props }) => props.external)

    const result: DeepPartial<GateTemplate> = {
        metadata: {
            name
        },
        tags: ['integrated'],
        pins: {
            inputs: {
                count: inputCount
            },
            outputs: {
                count: outputCount
            }
        },
        category: categories.ic,
        material: {
            type: 'image',
            fill: require('../../../assets/ic.svg')
        },
        properties: {
            enabled: !!props.length,
            data: props.map((gate) => {
                const template = getTemplateSafely(gate.template)
                return {
                    groupName: gate.props.label,
                    props: template.properties.data.map((prop) => {
                        if (isGroup(prop)) {
                            return prop
                        }
                        return {
                            ...prop,
                            base: gate.props[prop.name]
                        }
                    })
                } as PropGroup
            })
        }
    }

    templateStore.set(name, result)

    if (log) {
        toast(
            ...createToastArguments(
                translation.messages.compiledIc(name),
                'markunread_mailbox'
            )
        )
    }
}
