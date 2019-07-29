import { GateTemplate } from '../../simulation/types/GateTemplate'

export const delayProperties: GateTemplate['properties'] = {
    enabled: true,
    data: [
        {
            base: 1000,
            type: 'number',
            name: 'delay'
        }
    ]
}
