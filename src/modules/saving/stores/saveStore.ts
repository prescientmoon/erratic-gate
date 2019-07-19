import { LocalStore } from '../../storage/classes/LocalStore'
import { RendererState } from '../types/SimulationSave'

export const saveStore = new LocalStore<RendererState>('saves')
