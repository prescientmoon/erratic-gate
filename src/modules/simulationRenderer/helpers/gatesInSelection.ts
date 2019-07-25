import { Gate } from '../../simulation/classes/Gate'
import { aabbCollisionDetection } from './aabb'
import { Transform } from '../../../common/math/classes/Transform'
import { pointInSquare } from '../../../common/math/helpers/pointInSquare'

/**
 * Finds all selections in the selected area
 *
 * @param renderer The renderer to find the selected gates of
 */
export const gatesInSelection = (
    selectedArea: Transform,
    gates: Gate[] = []
) => {
    return gates.filter(({ transform }) => {
        if (aabbCollisionDetection(transform, selectedArea)) {
            return true
        }

        for (const point of transform.getPoints()) {
            if (pointInSquare(point, selectedArea)) {
                return true
            }
        }

        return false
    })
}
