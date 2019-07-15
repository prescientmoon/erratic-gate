import { BehaviorSubject } from 'rxjs'

export type vector2 = [number, number]
export type vector4 = [number, number, number, number]

export class Transform {
    public constructor(
        public position: vector2 = [0, 0],
        public scale: vector2 = [1, 1],
        public rotation = 0
    ) {}

    public getBoundingBox() {
        return [...this.position, ...this.scale] as vector4
    }

    /** Short forms for random stuff */

    get x() {
        return this.position[0]
    }

    get y() {
        return this.position[1]
    }

    get width() {
        return this.scale[0]
    }

    get height() {
        return this.scale[1]
    }

    get maxX() {
        return this.x + this.width
    }

    get maxY() {
        return this.y + this.height
    }

    set x(value: number) {
        this.position = [value, this.y]
    }

    set y(value: number) {
        this.position = [this.x, value]
    }
}
