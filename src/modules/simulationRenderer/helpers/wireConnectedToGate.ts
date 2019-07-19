import { Gate } from '../../simulation/classes/Gate'
import { Wire } from '../../simulation/classes/Wire'

export const wireConnectedToGate = (gate: Gate, wire: Wire) =>
    wire.end.value.gate === gate || wire.start.value.gate === gate
