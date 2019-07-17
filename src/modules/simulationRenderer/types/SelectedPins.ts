import { Transform } from '../../../common/math/classes/Transform'
import { PinWrapper } from '../../simulation/classes/Gate'

export interface SelectedPin {
    wrapper: PinWrapper
    transform: Transform
}

export interface SelectedPins {
    start: SelectedPin | null
    end: SelectedPin | null
}
