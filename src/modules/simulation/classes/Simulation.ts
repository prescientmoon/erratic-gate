import { Gate } from './Gate'
import { GateStorage } from './GateStorage'
import { LruCacheNode } from '@eix-js/utils'
import { Wire } from './Wire'
import { simulationMode } from '../../saving/types/SimulationSave'

export class Simulation {
    public gates = new GateStorage()
    public wires: Wire[] = []

    public constructor(public mode: simulationMode = 'project') {}

    public push(...gates: Gate[]) {
        for (const gate of gates) {
            const node = new LruCacheNode<Gate>(gate.id, gate)

            this.gates.set(gate.id, node)
        }
    }
}
