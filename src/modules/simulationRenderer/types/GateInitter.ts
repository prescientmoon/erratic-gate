import { vector2 } from '../../../common/math/classes/Transform'

/**
 * Used to init a gate at a certain position
 */
export interface GateInitter {
    name: string
    position: vector2
}
