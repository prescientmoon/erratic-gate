import { render, html, svg } from "lit-html"
import { subscribe } from "lit-rx"
import { Screen } from "./common/screen.ts";
import { Component } from "./common/component";
import { FunctionStore } from "./common/activation/activationStore";
import { ComponentManager } from "./common/componentManager";
import { map } from "rxjs/operators";
import { MDCMenu } from '@material/menu';

const screen = new Screen()

const manager = new ComponentManager()
manager.components.push(new Component("and", [200, 100], [100, 100]))
manager.components.push(new Component("not", [200, 500], [100, 100]))
manager.components.push(new Component("true", [200, 500], [100, 100]))
manager.components.push(new Component("false", [200, 500], [100, 100]))
manager.update()

const handleEvent = <T>(e: T, func: (e: T) => any) => {
    if (manager.barAlpha.value == "0")
        func(e)
    else if (manager.barAlpha.value == "1"
        && (e as unknown as MouseEvent).type == "mousedown"
        && (e as unknown as MouseEvent).target != document.getElementById("nameInput"))
        manager.barAlpha.next("0")
}

render(html`
    <div @mousemove=${(e: MouseEvent) => handleEvent(e, (e: MouseEvent) => {
    manager.handleMouseMove(e)
    screen.updateMouse(e)
})}
        @mousedown=${(e: MouseEvent) => handleEvent(e, (e: MouseEvent) =>
    manager.handleMouseDown(e)
)}
        @mouseup=${(e: MouseEvent) => handleEvent(e, (e: MouseEvent) =>
    manager.handleMouseUp(e)
)}
        @wheel=${(e: MouseEvent) => handleEvent(e, (e: WheelEvent) =>
    screen.handleScroll(e)
)}>

        <div id=${subscribe(manager.barAlpha.pipe(map(val =>
    (val == "1") ? "shown" : ""
)))}
        class=createBar>
            <div class="topContainer">
                <div>
                    <input name="ComponentName" id="nameInput"
                        placeholder=${subscribe(manager.placeholder)}
                    ></input>
                </div>
            </div>
        </div>
        <svg height=${ subscribe(screen.height)}
            width=${ subscribe(screen.width)}
            viewBox=${subscribe(screen.viewBox)}>
            ${ subscribe(manager.svgs)}
        </svg>
    </div>
    <div class="ModalContainer"></div>
    <aside class="mdc-drawer main-sidebar">
    <div class="mdc-drawer__content">
        <nav class="mdc-list">
        <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
            <span class="mdc-list-item__text">Something</span>
        </a>
        <a class="mdc-list-item" href="#" id="openSimulation" @click=${() => {
        menu.open = true
        // menu.setAbsolutePosition(screen.mousePosition[0], screen.mousePosition[1])
    }}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
            <span class="mdc-list-item__text">Open simulation</span>
        </a>
        <a class="mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
            <span class="mdc-list-item__text">another thing</span>
        </a>
        </nav>
    </div>
    </aside>

    <div class="mdc-menu mdc-menu-surface mdc-theme--primary-bg mdc-theme--on-primary">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            ${subscribe(manager.saves.pipe(map(val => html`
                <li class= "mdc-list-item" role = "menuitem" >
                    <span class="mdc-list-item__text"> ${val} </span>
                </li>`
            )))}
        </ul>
    </div>
`, document.body)

const menu = new MDCMenu(document.querySelector('.mdc-menu'));
menu.hoistMenuToBody()
menu.setAnchorElement(document.querySelector(`#openSimulation`))

manager.update()