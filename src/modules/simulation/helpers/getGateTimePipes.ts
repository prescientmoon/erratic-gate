import { GateTemplate } from '../types/GateTemplate'
import { debounceTime, throttleTime } from 'rxjs/operators'
import { MonoTypeOperatorFunction, pipe } from 'rxjs'

export type TimePipe = MonoTypeOperatorFunction<string>

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
