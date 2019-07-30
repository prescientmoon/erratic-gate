import { currentContext } from '../subjects'
import { SimulationError } from '../../errors/classes/SimulationError'

/**
 * Gets the current context and throw an error if it doesnt exist
 *
 * @throws SimulationError if no context can be found
 */
export const getCurrentContextSafely = () => {
    if (currentContext.value) {
        return currentContext.value
    } else {
        throw new SimulationError(`Cannot find a rendering context`)
    }
}
