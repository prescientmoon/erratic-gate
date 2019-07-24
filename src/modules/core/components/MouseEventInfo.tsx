import { vector2 } from '../../../common/math/types/vector2'
import { mouseButton } from '../types/mouseButton'

/**
 * The info about the mouse passed to mouse subjects
 */
export interface MouseEventInfo {
    position: vector2
    button: mouseButton
}
