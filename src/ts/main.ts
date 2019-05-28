import { render, html, svg } from "lit-html"
import { subscribe } from "lit-rx"
import { Screen } from "./common/screen.ts";
import { Component } from "./common/component";
import { FunctionStore } from "./common/activation/activationStore";
import { ComponentManager } from "./common/componentManager";
import { map } from "rxjs/operators";

const screen = new Screen()

const manager = new ComponentManager()
manager.components.push(new Component("and",[200,100],[100,100]))
manager.components.push(new Component("not",[200,500],[100,100]))
manager.components.push(new Component("true",[200,500],[100,100]))
manager.update()

const handleEvent = <T>(e:T,func:(e:T) => any) => {
    if (manager.barAlpha.value == "0")
        func(e)
    else if (manager.barAlpha.value == "1"
        && (e as unknown as MouseEvent).type == "mousedown"
        && (e as unknown as MouseEvent).target != document.getElementById("nameInput"))
        manager.barAlpha.next("0")
}

render(html`
    <div @mousemove=${(e:MouseEvent) => handleEvent(e,(e:MouseEvent) => {
            manager.handleMouseMove(e)
            screen.updateMouse(e)
        })}
        @mousedown=${(e:MouseEvent) => handleEvent(e,(e:MouseEvent) => 
            manager.handleMouseDown(e)
        )}
        @mouseup=${(e:MouseEvent) => handleEvent(e,(e:MouseEvent) => 
            manager.handleMouseUp(e)
        )}
        @wheel=${(e:MouseEvent) => handleEvent(e,(e:WheelEvent) => 
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
        <svg height=${ subscribe(screen.height) } 
            width=${ subscribe(screen.width) }
            viewBox=${subscribe(screen.viewBox)}>
            ${ subscribe(manager.svgs) }
        </svg>
    </div>

    <div class="ModalContainer"></div>
`, document.body)

manager.update()