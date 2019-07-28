import { templateStore } from '../../saving/stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { Gate } from '../classes/Gate'
import { add, relativeTo, multiply } from '../../vector2/helpers/basic'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { DefaultGateTemplate } from '../constants'
import { vector2 } from '../../../common/math/classes/Transform'
import { Screen } from '../../screen/helpers/Screen'
import { toast } from 'react-toastify'
import { createToastArguments } from '../../toasts/helpers/createToastArguments'
import { CurrentLanguage } from '../../internalisation/stores/currentLanguage'

export const addGate = (renderer: SimulationRenderer, templateName: string) => {
    const template = templateStore.get(templateName)
    const translation = CurrentLanguage.getTranslation()

    if (!template)
        throw new SimulationError(`Cannot find template ${templateName}`)

    const gate = new Gate(template)

    const gateScale =
        template.shape && template.shape.scale
            ? (template.shape.scale as vector2)
            : DefaultGateTemplate.shape.scale

    const origin = relativeTo(
        multiply(gateScale, 0.5),
        relativeTo(renderer.camera.transform.position, Screen.center)
    )

    const scalarOffset = renderer.options.spawning.spawnOffset
    const offset = multiply([scalarOffset, scalarOffset], renderer.spawnCount)

    gate.transform.position = add(origin, offset)

    renderer.simulation.push(gate)
    renderer.spawnCount++

    toast(
        ...createToastArguments(
            translation.messages.addedGate(templateName),
            'add_circle_outline'
        )
    )
}
