import { Vector } from "prelude-ts"
import { Subject, BehaviorSubject } from "rxjs";
import { ComponentState } from "./interfaces";
import { map } from "rxjs/operators";
import { Screen } from "../screen.ts";

export class Component {
    private static screen = new Screen()

    public position = new BehaviorSubject<number[]>(null)
    public scale = new BehaviorSubject<number[]>(null)
    public clicked = false

    private mouserDelta: number[]

    constructor(public activationType: string,
        position: [number, number] = [0, 0],
        scale: [number, number] = [0, 0]) {
        this.position.next(position)
        this.scale.next(scale)
    }

    handleMouseUp(e: MouseEvent) {
        this.clicked = false
    }

    move(e: MouseEvent) {
        const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)
        this.position.next(mousePosition.map((value, index) =>
            value - this.mouserDelta[index]
        ))
    }

    handleClick(e: MouseEvent) {
        const mousePosition = Component.screen.getWorldPosition(e.clientX, e.clientY)

        this.mouserDelta = this.position.value.map((value, index) =>
            mousePosition[index] - value
        )
        this.clicked = true
    }

    get state(): ComponentState {
        return {
            position: this.position.value as [number, number],
            scale: this.position.value as [number, number],
            activationType: this.activationType
        }
    }

    get x() {
        return this.position.pipe(map(val =>
            val[0]
        ))
    }
    get y() {
        return this.position.pipe(map(val =>
            val[1]
        ))
    }

    get width() {
        return this.scale.pipe(map(val =>
            val[0]
        ))
    }
    get height() {
        return this.scale.pipe(map(val =>
            val[1]
        ))
    }

    static fromState(state:ComponentState){
        return new Component(state.activationType, state.position, state.scale)
    }
}