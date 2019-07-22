import { LocalStore } from '../../storage/classes/LocalStore'
import { RendererState } from '../types/SimulationSave'

/**
 * This store is used to save all simulations.
 */
export const saveStore = new LocalStore<RendererState>('saves')
