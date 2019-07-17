import { Transform } from '../../../common/math/classes/Transform'
import { vector2 } from '../../../common/math/types/vector2'
import { Screen } from '../../core/classes/Screen'
import { relativeTo } from '../../vector2/helpers/basic'

export class Camera {
    private screen = new Screen()
    public transform = new Transform([0, 0], [this.screen.x, this.screen.y])

    public constructor() {
        this.screen.height.subscribe(value => {
            this.transform.height = value
        })
        this.screen.width.subscribe(value => {
            this.transform.width = value
        })
    }

    public toWordPostition(position: vector2) {
        return relativeTo(this.transform.position, position)
    }
}
