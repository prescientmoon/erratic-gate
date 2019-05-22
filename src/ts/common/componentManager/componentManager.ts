import { Singleton } from "@eix/utils";
import { Component } from "../component/component";
import { Subject } from "rxjs";
import { svg, SVGTemplateResult } from "lit-html";
import { subscribe } from "lit-rx";
import { Screen } from "../screen.ts";
import { MnanagerState } from "./interfaces";

@Singleton
export class ComponentManager {
    public components: Component[] = []
    public svgs = new Subject<SVGTemplateResult[]>()

    private onTop: Component
    private clicked = false
    private screen = new Screen()

    constructor() {
        this.svgs.next(this.render())
    }

    update() {
        this.svgs.next(this.render())
    }

    handleMouseDown(e: MouseEvent) {
        this.clicked = true
    }

    handleMouseUp(e: MouseEvent) {
        this.clicked = false
    }

    handleMouseMove(e: MouseEvent) {
        let toAddOnTop: number
        let outsideComponents = true

        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i]
            if (component.clicked) {
                outsideComponents = false
                component.move(e)
                if (this.onTop != component) {
                    toAddOnTop = i
                }
            }
        }

        if (toAddOnTop >= 0) {
            this.onTop = this.components[toAddOnTop]
            this.components.push(this.onTop)
            this.update()
        }

        else if (outsideComponents && this.clicked) {
            const mousePosition = [e.clientX, e.clientY]
            const delta = mousePosition.map((value, index) =>
                this.screen.mousePosition[index] - value
            ) as [number, number]
            this.screen.move(...delta)
        }
    }

    render() {
        let toRemoveDuplicatesFor: Component

        const result = this.components.map(component => svg`
            <rect width=${ subscribe(component.width)}
             height=${ subscribe(component.height)} 
             x=${ subscribe(component.x)}
             y=${ subscribe(component.y)}
             fill="red"
             stroke="black"
             @mousedown=${ (e: MouseEvent) => component.handleClick(e)}
             @mouseup=${ (e: MouseEvent) => {
                component.handleMouseUp(e)
                toRemoveDuplicatesFor = component
            }}
             >
        `);

        if (toRemoveDuplicatesFor)
            this.removeDuplicates(toRemoveDuplicatesFor)

        return result
    }

    private removeDuplicates(component: Component) {
        let instances = this.components
            .map((value, index) => (value == component) ? index : null)
            .filter(value => value)
        instances.pop()

        this.components = this.components
            .filter((val, index) => instances.indexOf(index) != -1)
    }

    get state(): MnanagerState {
        const components = Array.from((new Set(this.components)).values())
        return {
            components: components.map(value => value.state)
        }
    }

    loadState(state:MnanagerState) {
        this.clicked = false
        this.components = state.components.map(value => Component.fromState(value))
        this.onTop = null
        this.update()
    }

    save(){
        //TODO: implement
    }
}