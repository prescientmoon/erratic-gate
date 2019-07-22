import { LocalStore } from '../../storage/classes/LocalStore'
import { GateTemplate } from '../../simulation/types/GateTemplate'

/**
 * This store is used to save all logic gate templates
 */
export const templateStore = new LocalStore<DeepPartial<GateTemplate>>(
    'templates'
)
