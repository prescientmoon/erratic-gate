import { Simulation, SimulationEnv } from '../../simulation/classes/Simulation'
import { SimulationError } from '../../errors/classes/SimulationError'
import { fromSimulationState } from '../../saving/helpers/fromState'

export interface Context {
    memory: Record<string, unknown>
    get: (index: number) => boolean
    set: (index: number, state: boolean) => void
    color: (color: string) => void
    enviroment: SimulationEnv
}

export interface InitialisationContext {
    memory: Record<string, unknown>
}
