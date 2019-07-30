import { Gate } from './Gate'
import { GateStorage } from './GateStorage'
import { LruCacheNode } from '@eix-js/utils'
import { Wire } from './Wire'
import { simulationMode } from '../../saving/types/SimulationSave'
import { BehaviorSubject } from 'rxjs'

/**
 * The env a simulation can run in
 */
export type SimulationEnv = 'gate' | 'global'

export class Simulation {
    public gates = new GateStorage()
    public wires: Wire[] = []

    public constructor(
        public mode: simulationMode = 'project',
        public name: string,
        public env: SimulationEnv = 'global'
    ) {}

    public push(...gates: Gate[]) {
        for (const gate of gates) {
            gate.env = this.env

            const node = new LruCacheNode<Gate>(gate.id, gate)

            this.gates.set(gate.id, node)
        }
    }

    public dispose() {
        for (const gate of this.gates) {
            gate.dispose()
        }
    }
}
