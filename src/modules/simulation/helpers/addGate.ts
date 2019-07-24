import { templateStore } from '../../saving/stores/templateStore'
import { SimulationError } from '../../errors/classes/SimulationError'
import { Simulation } from '../classes/Simulation'
import { Gate } from '../classes/Gate'
import { add, relativeTo, multiply } from '../../vector2/helpers/basic'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { DefaultGateTemplate } from '../constants'
import { vector2 } from '../../../common/math/classes/Transform'

export const addGate = (renderer: SimulationRenderer, templateName: string) => {
    const template = templateStore.get(templateName)

    if (!template)
        throw new SimulationError(`Cannot find template ${templateName}`)

    const gate = new Gate(template)

    const gateScale =
        template.shape && template.shape.scale
            ? (template.shape.scale as vector2)
            : DefaultGateTemplate.shape.scale

    const origin = relativeTo(
        multiply(gateScale, 0.5),
        relativeTo(renderer.camera.transform.position, renderer.screen.center)
    )

    const scalarOffset = renderer.options.spawning.spawnOffset
    const offset = multiply([scalarOffset, scalarOffset], renderer.spawnCount)

    gate.transform.position = add(origin, offset)

    renderer.simulation.push(gate)
    renderer.spawnCount++
}
