import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { saveStore } from '../../saving/stores/saveStore'
import { removeElement } from '../../../common/lang/arrays/helpers/removeElement'
import { initSimulation } from '../../saving/helpers/initSimulation'
import { defaultSimulationName } from '../../saving/constants'
import { randomItem } from '../../internalisation/helpers/randomItem'
import { switchTo } from '../../saving/helpers/switchTo'
import { updateLogicGateList } from '../../logic-gates/subjects/LogicGateList'
import { getTemplateSafely } from '../../logic-gates/helpers/getTemplateSafely'
import { SimulationError } from '../../errors/classes/SimulationError'
import { templateStore } from '../../saving/stores/templateStore'
import { updateSimulationList } from '../../core/components/OpenSimulation'

/**
 * Deletes the current simulation
 *
 * @param renderer The current renderer
 */
export const deleteSimulation = (
    renderer: SimulationRenderer,
    name?: string,
    shouldDeleteIc = true
) => {
    const toDelete = name ? name : renderer.simulation.name

    if (toDelete === renderer.simulation.name) {
        const others = saveStore.ls()
        removeElement(others, toDelete)

        if (!others.length) {
            initSimulation(defaultSimulationName, 'project')
        }

        const switchTarget = randomItem(others)
        switchTo(switchTarget)
    }

    // actually delete simulation
    const deleted = saveStore.delete(toDelete)

    if (shouldDeleteIc && deleted.simulation.mode === 'ic') {
        deleteGateFromMemory(renderer, toDelete, false)
    } else {
        updateLogicGateList()
    }

    updateSimulationList()
}

/**
 * Deletes a gate from memory
 *
 * @param renderer The current renderer
 * @param name The name of the gate
 *
 * @throws SimulationError if the gate cannot be deleted
 */
export const deleteGateFromMemory = (
    renderer: SimulationRenderer,
    name: string,
    shouldDeleteSimulation = true
) => {
    const template = getTemplateSafely(name)

    if (template.tags.includes('base')) {
        throw new SimulationError('Cannot delete base gate')
    }

    templateStore.delete(name)

    if (shouldDeleteSimulation && saveStore.get(name)) {
        deleteSimulation(renderer, name, false)
    }

    // delete all occurance of that gate
    for (const simulationName of saveStore.ls()) {
        const simulationState = saveStore.get(simulationName)

        if (!simulationState) {
            throw new SimulationError(
                `Cannot find simulation ${simulationName}`
            )
        }

        simulationState.simulation.gates = simulationState.simulation.gates.filter(
            gate => gate.template !== name
        )

        saveStore.set(simulationName, simulationState)
    }

    updateLogicGateList()
}
