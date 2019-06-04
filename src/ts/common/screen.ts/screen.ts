import { fromEvent, BehaviorSubject, combineLatest } from "rxjs"
import { Singleton } from "@eix/utils"
import { map, take } from "rxjs/operators";
import clamp from "../clamp/clamp";
import { manager } from "../../main";

@Singleton
export class Screen {
    width = new BehaviorSubject<number>(0)
    height = new BehaviorSubject<number>(0)
    viewBox = combineLatest(this.width, this.height).pipe(map((values: [number, number]) =>
        this.getViewBox(...values)
    ));

    public position = [0, 0]
    public scale = [2, 2]

    private zoomLimits: [number, number] = [0.1, 10]

    private scrollStep = 1.3
    public mousePosition = [this.width.value / 2, this.height.value / 2]

    constructor() {
        this.update()

        fromEvent(window, "resize").subscribe(() => this.update())
    }

    updateMouse(e: MouseEvent) {
        this.mousePosition = [e.clientX, e.clientY]
    }

    handleScroll(e: WheelEvent) {
        e.preventDefault()

        const componentToScale = manager.scaling
        const sign = e.deltaY / Math.abs(e.deltaY)
        const zoom = this.scrollStep ** sign

        if (componentToScale) {
            const oldScale = componentToScale.scale.value
            const newScale = oldScale.map(val => val / zoom)

            componentToScale.scale.next(newScale)
            componentToScale.position.pipe(take(1)).subscribe(data => {
                componentToScale.position.next(data.map((val, index) =>
                    val - (newScale[index] - oldScale[index]) / 2
                ))
            })

            manager.top(componentToScale)
        }
        else {
            const size = [this.width.value, this.height.value]
            const mouseFraction = size.map((value, index) => this.mousePosition[index] / value)
            const newScale = this.scale.map(value => clamp(value * zoom, ...this.zoomLimits))
            const delta = this.scale.map((_, index) =>
                size[index] * (newScale[index] - this.scale[index]) * mouseFraction[index]
            )

            this.scale = newScale
            this.position = this.position.map((value, index) => value - delta[index])
            this.update()
        }
    }

    move(x: number, y: number) {
        this.position[0] += x * this.scale[0]
        this.position[1] += y * this.scale[1]
        this.update()
    }

    getViewBox(width: number, height: number) {
        return [
            this.position[0],
            this.position[1],
            this.scale[0] * width,
            this.scale[1] * height
        ].join(" ")
    }

    update() {
        this.height.next(window.innerHeight)
        this.width.next(window.innerWidth)
    }

    getWorldPosition(x: number, y: number) {
        return [x * this.scale[0], y * this.scale[1]]
    }
}