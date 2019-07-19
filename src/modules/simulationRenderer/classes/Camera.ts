import { Transform } from '../../../common/math/classes/Transform'
import { vector2 } from '../../../common/math/types/vector2'
import { Screen } from '../../core/classes/Screen'
import { relativeTo } from '../../vector2/helpers/basic'

export class Camera {
    public transform = new Transform([0, 0])

    public constructor() {
        // this.screen.height.subscribe(value => {
        //     this.transform.height = value
        // })
        // this.screen.width.subscribe(value => {
        //     this.transform.width = value
        // })
    }

    public toWordPostition(position: vector2) {
        return [
            (position[0] - this.transform.position[0]) /
                this.transform.scale[0],
            (position[1] - this.transform.position[1]) / this.transform.scale[1]
        ] as vector2
    }
}
