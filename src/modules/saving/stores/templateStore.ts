import { LocalStore } from '../../storage/classes/LocalStore'
import { GateTemplate } from '../../simulation/types/GateTemplate'

export const templateStore = new LocalStore<DeepPartial<GateTemplate>>(
    'templates'
)
