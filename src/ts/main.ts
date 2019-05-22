import { render, html, svg } from "lit-html"
import { subscribe } from "lit-rx"
import { Screen } from "./common/screen.ts";
import { Component } from "./common/component";
import { FunctionStore } from "./common/activation/activationStore";
import { ComponentManager } from "./common/componentManager";

const screen = new Screen()

const test = new FunctionStore()
test.register("buffer",(data) => {
    return true;
})

const manager = new ComponentManager()
manager.components.push(new Component("none",[200,100],[200,30]))
manager.components.push(new Component("none",[300,100],[200,30]))
manager.components.push(new Component("none",[400,100],[200,30]))
manager.components.push(new Component("none",[500,100],[200,30]))
manager.components.push(new Component("none",[600,100],[200,30]))
manager.update()

console.log(manager.state)

render(html`
    <svg height=${ subscribe(screen.height) } width=${ subscribe(screen.width) }
        @mousemove=${(e:MouseEvent) => {
            manager.handleMouseMove(e)
            screen.updateMouse(e)
        }}
        viewBox=${subscribe(screen.viewBox)}
        @mousedown=${(e:MouseEvent) => manager.handleMouseDown(e)}
        @mouseup=${(e:MouseEvent) => manager.handleMouseUp(e)}
        @wheel=${(e:WheelEvent) => screen.handleScroll(e)}
    >
        ${ subscribe(manager.svgs) }
    </svg>
`, document.body)

manager.update()