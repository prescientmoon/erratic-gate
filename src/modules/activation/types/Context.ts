import { Simulation, SimulationEnv } from '../../simulation/classes/Simulation'
import { SimulationError } from '../../errors/classes/SimulationError'
import { fromSimulationState } from '../../saving/helpers/fromState'

export interface Context {
    memory: Record<string, unknown>
    getProperty: (name: string) => unknown
    setProperty: (name: string, value: unknown) => void
    get: (index: number) => boolean
    set: (index: number, state: boolean) => void
    color: (color: string) => void
    innerText: (value: string) => void
    update: () => void
    enviroment: SimulationEnv
    colors: Record<string, string>
}

export interface InitialisationContext {
    memory: Record<string, unknown>
}
