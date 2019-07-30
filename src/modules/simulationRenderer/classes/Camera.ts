import { Transform } from '../../../common/math/classes/Transform'
import { vector2 } from '../../../common/math/types/vector2'
import {
    substract,
    multiplyVectors,
    add,
    inverse
} from '../../vector2/helpers/basic'

/**
 * worldPosition(x) = (x - p) / s
 * s * wp = x - p
 * screenPosition(x) = s * x + p
 */

export class Camera {
    public transform = new Transform([0, 0])

    /**
     * Gets the world position of a vector
     *
     * @param position The position to transform
     */
    public toWordPostition(position: vector2) {
        return multiplyVectors(
            substract(position, this.transform.position),
            inverse(this.transform.scale)
        )
    }

    /**
     * Gets the screen position of a vector
     *
     * @param position The position to transform
     */
    public toScreenPosition(position: vector2) {
        return add(
            multiplyVectors(position, this.transform.scale),
            this.transform.position
        )
    }
}
