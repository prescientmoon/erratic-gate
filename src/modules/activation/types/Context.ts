import { Simulation, SimulationEnv } from '../../simulation/classes/Simulation'
import { PinState } from '../../simulation/classes/Pin'

export interface Context {
    getProperty: (name: string) => unknown
    setProperty: (name: string, value: unknown) => void
    get: (index: number) => PinState
    set: (index: number, state: PinState) => void
    getBinary: (index: number) => number
    setBinary: (index: number, value: number, bits: number) => void
    invertBinary: (value: number) => number
    color: (color: string) => void
    innerText: (value: string) => void
    update: () => void
    toLength: (value: number | PinState, length: number) => string
    maxLength: number
    enviroment: SimulationEnv
    colors: Record<string, string>
    memory: Record<string, unknown>
}

export interface InitialisationContext {
    memory: Record<string, unknown>
}
