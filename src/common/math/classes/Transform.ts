import { allCombinations } from '../../../modules/simulation/helpers/allCombinations'
import { BehaviorSubject } from 'rxjs'
import { vector2 } from '../types/vector2'
import { vector4 } from '../types/vector4'

export class Transform {
    /**
     * Gets the position as a subject
     */
    public positionSubject = new BehaviorSubject<vector2>([0, 0])

    /**
     * Class used to represend the position scale and rotation
     * of a body in 2d space
     *
     * @param _position The initial position
     * @param scale The initial scale
     * @param rotation The initial scale of the object
     */
    public constructor(
        public _position: vector2 = [0, 0],
        public scale: vector2 = [1, 1],
        public rotation = 0
    ) {
        this.updatePositionSubject()
    }

    /**
     * Gets the boundng box of the transform
     */
    public getBoundingBox() {
        const result = [...this.position, ...this.scale] as vector4

        return result
    }

    /**
     * Gets an array of all points in the transform
     */
    public getPoints() {
        const combinations = Array.from(allCombinations([0, 1], [0, 1]))

        // those are not in the right order
        const points = combinations.map(combination => [
            this.x + this.height * combination[0],
            this.y + this.width * combination[1]
        ])

        return points as vector2[]
    }

    /**
     * Pushes the current position trough the position subject
     */
    private updatePositionSubject() {
        this.positionSubject.next(this.position)
    }

    /**
     * getter for the position
     */
    get position() {
        return this._position
    }

    /**
     * setter for the position
     */
    set position(value: vector2) {
        this._position = value

        this.updatePositionSubject()
    }

    /**
     * The first element of the position vector
     */
    get x() {
        return this.position[0]
    }

    /**
     * The second element of the position vector
     */
    get y() {
        return this.position[1]
    }

    /**
     * The first element of the scale vector
     */
    get width() {
        return this.scale[0]
    }

    /**
     * The second element of the scale vector
     */
    get height() {
        return this.scale[1]
    }

    /**
     * The minimum x position of the buonding box
     */
    get minX() {
        return Math.min(this.x, this.x + this.width)
    }

    /**
     * The maximum x position of the bounding box
     */
    get maxX() {
        return Math.max(this.x, this.x + this.width)
    }

    /**
     * The minimum y position of the buonding box
     */
    get minY() {
        return Math.min(this.y, this.y + this.height)
    }

    /**
     * The maximum y position of the buonding box
     */
    get maxY() {
        return Math.max(this.y, this.y + this.height)
    }

    /**
     * The center of the bounding box
     */
    get center() {
        return [this.x + this.width / 2, this.y + this.height / 2] as vector2
    }

    /**
     * Sets the first element of the position vector
     *
     * @param value The value to set x to
     */
    set x(value: number) {
        this.position = [value, this.y]

        this.updatePositionSubject()
    }

    /**
     * Sets the second element of the position vector
     *
     * @param value The value to set y to
     */
    set y(value: number) {
        this.position = [this.x, value]

        this.updatePositionSubject()
    }

    /**
     * Sets the first element of the scale vector
     *
     * @param value The value to set the width to
     */
    set width(value: number) {
        this.scale = [value, this.height]
    }

    /**
     * Sets the second element of the scale vector
     *
     * @param value The value to set the height to
     */
    set height(value: number) {
        this.scale = [this.width, value]
    }
}
