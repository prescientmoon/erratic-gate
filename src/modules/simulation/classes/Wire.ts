import { idStore } from '../stores/idStore'
import { PinWrapper } from './Gate'
import { SimulationError } from '../../errors/classes/SimulationError'

export class Wire {
    public id: number

    public constructor(
        public start: PinWrapper,
        public end: PinWrapper,
        id?: number
    ) {
        if (end.value.pairs.size !== 0) {
            throw new SimulationError('An input pin can only have 1 pair')
        }

        end.value.addPair(start.value, true)
        start.value.addPair(end.value)

        this.id = id !== undefined ? id : idStore.generate()
    }

    public dispose() {
        this.end.value.removePair(this.start.value)
        this.start.value.removePair(this.end.value)
    }
}
