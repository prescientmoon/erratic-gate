import { BehaviorSubject } from 'rxjs'
import { allCombinations } from '../helpers/allCombinations'
import { rotateAroundVector } from '../../vector2/helpers/rotate'

export type vector2 = [number, number]
export type vector3 = [number, number, number]
export type vector4 = [number, number, number, number]
export type vector8 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
]

export class Transform {
    public constructor(
        public position: vector2 = [0, 0],
        public scale: vector2 = [1, 1],
        public rotation = 0
    ) {}

    public getBoundingBox() {
        return [...this.position, ...this.scale] as vector4
    }

    public getPoints() {
        const combinations = Array.from(allCombinations([0, 1], [0, 1]))

        // those are not in the right order
        const points = combinations.map(combination => [
            this.x + this.height * combination[0],
            this.y + this.width * combination[1]
        ])

        const pointsInTheRightOrder = [
            points[0],
            points[1],
            points[3],
            points[2]
        ] as vector2[]

        const result = pointsInTheRightOrder.map(point =>
            rotateAroundVector(point, this.center, this.rotation)
        ) as vector2[]

        return result
    }

    public getEdges() {
        const points = this.getPoints()
        const edges = []

        for (let index = 0; index < points.length; index++) {
            edges.push([points[index], points[(index + 1) % points.length]])
        }

        return edges as [vector2, vector2][]
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

    get center() {
        return [this.x + this.width / 2, this.y + this.height / 2] as vector2
    }

    set x(value: number) {
        this.position = [value, this.y]
    }

    set y(value: number) {
        this.position = [this.x, value]
    }
}
