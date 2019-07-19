import { GateTemplate } from '../types/GateTemplate'
import { debounceTime, throttleTime } from 'rxjs/operators'
import { MonoTypeOperatorFunction, pipe } from 'rxjs'

export type TimePipe = MonoTypeOperatorFunction<boolean>

export const getGateTimePipes = (template: GateTemplate) => {
    const pipes: TimePipe[] = []

    if (template.simulation.debounce.enabled) {
        pipes.push(debounceTime(template.simulation.debounce.time))
    }

    if (template.simulation.throttle.enabled) {
        pipes.push(throttleTime(template.simulation.throttle.time))
    }

    return pipes as [TimePipe]
}
