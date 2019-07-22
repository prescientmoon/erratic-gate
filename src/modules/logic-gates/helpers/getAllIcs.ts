import { saveStore } from '../../saving/stores/saveStore'
import { SimulationError } from '../../errors/classes/SimulationError'

/**
 * Helper to get the names of all integrated circuits
 *
 * @throws SimulationError if a save cannot be found in localsStorage
 */
export const getAllics = () => {
    const saves = saveStore.ls()
    const result: string[] = []

    for (const save of saves) {
        const saveState = saveStore.get(save)

        if (saveState) {
            if (saveState.simulation.mode === 'ic') {
                result.push(saveState.simulation.name)
            }
        } else {
            throw new SimulationError(`Cannot find save ${save}`)
        }
    }

    return result
}
