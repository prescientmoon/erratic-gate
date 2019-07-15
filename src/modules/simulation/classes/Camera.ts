import { Transform, vector2 } from './Transform'
import { Screen } from '../../core/classes/Screen'

export class Camera {
    private screen = new Screen()
    public transform = new Transform([0, 0], [this.screen.x, this.screen.y])

    public toWordPostition(position: vector2) {
        return position.map(
            (value, index) => value + this.transform.position[index]
        ) as vector2
    }
}
