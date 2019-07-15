import { Gate } from './Gate'
import { GateStorage } from './GateStorage'
import { LruCacheNode } from '@eix-js/utils'

export class Simulation {
    public gates = new GateStorage()

    public push(...gates: Gate[]) {
        for (const gate of gates) {
            const node = new LruCacheNode<Gate>(gate.id, gate)

            this.gates.set(gate.id, node)
        }
    }
}
