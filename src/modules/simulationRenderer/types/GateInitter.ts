import { vector2 } from '../../../common/math/types/vector2'

/**
 * Used to init a gate at a certain position
 */
export interface GateInitter {
    name: string
    position: vector2
}
