import merge from 'deepmerge'
import { GateTemplate } from '../../simulation/types/GateTemplate'
import { DefaultGateTemplate } from '../../simulation/constants'

export const completeTemplate = (template: DeepPartial<GateTemplate>) => {
    return merge(DefaultGateTemplate, template, {
        arrayMerge: (a: unknown[], b: unknown[]) => b
    }) as GateTemplate
}
