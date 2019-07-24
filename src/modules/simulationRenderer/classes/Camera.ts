import { Transform } from '../../../common/math/classes/Transform'
import { vector2 } from '../../../common/math/types/vector2'

export class Camera {
    public transform = new Transform([0, 0])

    public toWordPostition(position: vector2) {
        return [
            (position[0] - this.transform.position[0]) /
                this.transform.scale[0],
            (position[1] - this.transform.position[1]) / this.transform.scale[1]
        ] as vector2
    }
}
