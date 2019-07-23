import { SimulationState } from '../../saving/types/SimulationSave'
import { SimulationError } from '../../errors/classes/SimulationError'
import { GateTemplate } from '../../simulation/types/GateTemplate'
import {
    simulationInputCount,
    simulationOutputCount
} from './simulationIoCount'
import { templateStore } from '../../saving/stores/templateStore'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'

/**
 * Compiles a simulation into a logicGate
 *
 * @param simulaton The simulation to compile
 */
export const compileIc = ({ mode, name, gates }: SimulationState) => {
    if (mode === 'project') {
        throw new SimulationError('Cannot compile project')
    }

    const translation = CurrentLanguage.getTranslation()
    const inputCount = simulationInputCount(gates)
    const outputCount = simulationOutputCount(gates)

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
        }
    }

    templateStore.set(name, result)
    toast(
        ...createToastArguments(
            translation.messages.compiledIc(name),
            'markunread_mailbox'
        )
    )
}
