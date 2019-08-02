import { templateStore } from '../../saving/stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { Gate } from '../classes/Gate'
import {
    add,
    relativeTo,
    multiply,
    multiplyVectors
} from '../../vector2/helpers/basic'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { DefaultGateTemplate } from '../constants'
import { vector2 } from '../../../common/math/types/vector2'
import { Screen } from '../../screen/helpers/Screen'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'
import { GateInitter } from '../../simulationRenderer/types/GateInitter'
import { calculateGateHeight } from '../../simulationRenderer/helpers/calculateGateHeight'

/**
 * Adds a gate to a renderer
 *
 * @param renderer The renderer to add the gate to
 * @param templateName The name of the template to add
 */
export const addGate = (
    renderer: SimulationRenderer,
    templateName: string,
    log = true
) => {
    const template = templateStore.get(templateName)

    if (!template)
        throw new SimulationError(`Cannot find template ${templateName}`)

    const gate = new Gate(template)

    const gateScale =
        template.shape && template.shape.scale
            ? (template.shape.scale as vector2)
            : DefaultGateTemplate.shape.scale

    const origin = renderer.camera.toWordPostition(
        add(multiply(gateScale, 0.5), Screen.center)
    )

    const scalarOffset = renderer.options.spawning.spawnOffset
    const offset = multiply([scalarOffset, scalarOffset], renderer.spawnCount)

    gate.transform.position = add(origin, offset)
    gate.transform.scale = [...Array(2)].fill(
        calculateGateHeight(renderer, gate)
    ) as vector2

    renderer.simulation.push(gate)
    renderer.spawnCount++

    if (log) {
        const translation = CurrentLanguage.getTranslation()

        toast(
            ...createToastArguments(
                translation.messages.addedGate(templateName),
                'add_circle_outline'
            )
        )
    }

    return gate.id
}

/**
 * Adds a gate to a renderer and sets its position
 *
 * @param renderer The renderer to add the gate to
 * @param initter The initter to use
 */
export const instantiateGateInitter = (
    renderer: SimulationRenderer,
    initter: GateInitter,
    log = true
) => {
    const id = addGate(renderer, initter.name, log)

    const gate = renderer.simulation.gates.get(id)

    if (gate && gate.data) {
        gate.data.transform.position = initter.position
    }

    return id
}
