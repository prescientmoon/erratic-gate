import { render, html } from 'lit-html'
import { subscribe } from 'lit-rx'
import { Screen } from './common/screen.ts'
import { ComponentManager } from './common/componentManager'
import { map } from 'rxjs/operators'
import { MDCMenu } from '@material/menu'
import { error } from 'toastr'
import { modal } from './common/modals'
import { importComponent } from './common/componentImporter/importComponent'

const screen = new Screen()

export const manager = new ComponentManager()
manager.save()
manager.update()

window.onerror = (
    message: string,
    url: string,
    lineNumber: number
): boolean => {
    error(message, '', {
        ...manager.alertOptions,
        onclick: () =>
            modal({
                no: '',
                yes: 'close',
                title: 'Error',
                content: html`
                    <table>
                        <tr>
                            <td>Url:</td>
                            <td>${url}</td>
                        </tr>
                        <tr>
                            <td>Message:</td>
                            <td>${message}</td>
                        </tr>
                        <tr>
                            <td>Line:</td>
                            <td>${lineNumber}</td>
                        </tr>
                    </table>
                `
            })
    })

    return true
}

const handleEvent = <T>(e: T, func: (e: T) => any) => {
    if (manager.barAlpha.value == '0') func(e)
    else if (
        manager.barAlpha.value == '1' &&
        ((e as unknown) as MouseEvent).type == 'mousedown' &&
        ((e as unknown) as MouseEvent).target !=
            document.getElementById('nameInput')
    )
        manager.barAlpha.next('0')
}

const moveHandler = (e: MouseEvent) =>
    handleEvent(e, (e: MouseEvent) => {
        manager.handleMouseMove(e)
        screen.updateMouse(e)
    })

render(
    html`
    <div @mousemove=${moveHandler}
    @touchmove=${moveHandler}
        @mousedown=${(e: MouseEvent) =>
            handleEvent(e, () => manager.handleMouseDown())}
        @touchdown=${(e: MouseEvent) =>
            handleEvent(e, () => manager.handleMouseDown())}
                @mouseup=${(e: MouseEvent) =>
                    handleEvent(e, () => manager.handleMouseUp())}
        @touchup=${(e: MouseEvent) =>
            handleEvent(e, () => manager.handleMouseUp())}
                @wheel=${(e: MouseEvent) =>
                    handleEvent(e, (e: WheelEvent) => screen.handleScroll(e))}>

        <div id=${subscribe(
            manager.barAlpha.pipe(map(val => (val == '1' ? 'shown' : '')))
        )}
        class=createBar>
            <div class="topContainer">
                <div>
                    <input name="ComponentName" id="nameInput"
                        placeholder=${subscribe(manager.placeholder)}
                    ></input>
                </div>
            </div>
        </div>
        <svg height=${subscribe(screen.height)}
            width=${subscribe(screen.width)}
            viewBox=${subscribe(screen.viewBox)}>
            ${subscribe(manager.svgs)}
        </svg>
    </div>
    <div class="ModalContainer"></div>
    <aside class="mdc-drawer main-sidebar">
    <div class="mdc-drawer__content">
        <nav class="mdc-list">
        <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page" @click=${() =>
            manager.prepareNewSimulation()}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">note_add</i>
            <span class="mdc-list-item__text">Create new simulation</span>
        </a>
        <a class="mdc-list-item" href="#" id="openSimulation" @click=${() => {
            menus[0].open = true
        }}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">folder_open</i>
            <span class="mdc-list-item__text">Open simulation</span>
        </a>
        <a class="mdc-list-item" href="#" id="openFile" @click=${() => {
            menus[2].open = true
        }}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">insert_drive_file</i>
            <span class="mdc-list-item__text">Simulation</span>
        </a>
        <a class="mdc-list-item" href="#" id="openCustomGates" @click=${() => {
            menus[3].open = true
        }}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">edit</i>
            <span class="mdc-list-item__text">Custom gates</span>
        </a>
        <a class="mdc-list-item" href="#" id="openGates" @click=${() => {
            menus[1].open = true
        }}>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add</i>
            <span class="mdc-list-item__text">Add component</span>
        </a>
        
        </nav>
    </div>
    </aside>

    <div class="mdc-menu mdc-menu-surface mdc-theme--primary-bg mdc-theme--on-primary" id="saveMenu">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            ${subscribe(
                manager.saves.pipe(
                    map(_ =>
                        _.map(
                            val => html`
                                <li
                                    class="mdc-list-item"
                                    role="menuitem"
                                    @click=${() => manager.switchTo(val)}
                                >
                                    <span class="mdc-list-item__text">
                                        ${val}
                                    </span>
                                    <span
                                        class="material-icons mdc-list-item__meta"
                                        @click=${() => manager.delete(val)}
                                    >
                                        delete
                                    </span>
                                </li>
                            `
                        )
                    )
                )
            )}
        </ul>
    </div>

    <div class="mdc-menu mdc-menu-surface mdc-theme--primary-bg mdc-theme--on-primary" id="gateMenu">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            ${subscribe(
                manager.gates.pipe(
                    map(gates =>
                        [...gates].sort().map(name => {
                            const gate = manager.templateStore.store.get(name)
                            return html`
                                <li
                                    class="mdc-list-item"
                                    role="menuitem"
                                    @click=${() => manager.add(name)}
                                >
                                    <span class="mdc-list-item__text">
                                        ${name}
                                    </span>
                                    ${gate.imported || gate.editable
                                        ? html`
                                              &nbsp &nbsp &nbsp
                                              <span
                                                  class="material-icons mdc-list-item__meta"
                                                  @click=${(e: MouseEvent) => {
                                                      e.preventDefault()
                                                      e.stopPropagation()

                                                      manager.templateStore.store.delete(
                                                          name
                                                      )
                                                  }}
                                              >
                                                  delete
                                              </span>
                                          `
                                        : ''}
                                </li>
                            `
                        })
                    )
                )
            )}
        </ul>
    </div>

    <div class="mdc-menu mdc-menu-surface mdc-theme--primary-bg mdc-theme--on-primary" id="fileMenu">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            ${[...Object.keys(manager.file)].sort().map(
                key => html`
                    <li
                        class="mdc-list-item"
                        role="menuitem"
                        @click=${() => manager.file[key]()}
                    >
                        <span class="mdc-list-item__text">${key}</span>
                        ${manager.shortcuts[key]
                            ? html`
                                  <span class="mdc-list-item__meta"
                                      >&nbsp &nbsp &nbsp
                                      ${manager.shortcuts[key]}</span
                                  >
                              `
                            : ''}
                    </li>
                `
            )}
        </ul>
    </div>

     <div class="mdc-menu mdc-menu-surface mdc-theme--primary-bg mdc-theme--on-primary" id="customGateMenu">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
           ${subscribe(
               manager.gates.pipe(
                   map(gates =>
                       gates
                           .map(name => manager.templateStore.store.get(name))
                           .filter(gate => gate.editable || gate.imported)
                           .map(
                               gate => html`
                                   <li
                                       class="mdc-list-item"
                                       role="menuitem"
                                       @click=${(e: MouseEvent) => {
                                           e.preventDefault()
                                           e.stopPropagation()

                                           if (gate.editable) {
                                               manager.edit(gate.name)
                                           } else {
                                               importComponent(
                                                   manager,
                                                   gate.importCommand
                                               )
                                           }
                                       }}
                                   >
                                       <i
                                           class="material-icons mdc-list-item__graphic"
                                           aria-hidden="true"
                                           >${gate.imported
                                               ? 'refresh'
                                               : 'edit'}</i
                                       >
                                       <span class="mdc-list-item__text">
                                           ${gate.name}
                                       </span>
                                   </li>
                               `
                           )
                   )
               )
           )}
            <li class= "mdc-list-item" role = "menuitem" @click=${() =>
                manager.newGate()}>
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add</i>
                <span class="mdc-list-item__text"> New custom gate </span>
            </li>
            <li class= "mdc-list-item" role = "menuitem" @click=${() =>
                manager.importGate()}>
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add</i>
                <span class="mdc-list-item__text"> Import new gate </span>
                <span class="mdc-list-item__meta">&nbsp &nbsp &nbsp ctrl + g</span>
            </li>
        </ul>
    </div>
`,
    document.body
)

const menus = [
    new MDCMenu(document.querySelector('#saveMenu')),
    new MDCMenu(document.querySelector('#gateMenu')),
    new MDCMenu(document.querySelector('#fileMenu')),
    new MDCMenu(document.querySelector('#customGateMenu'))
]
menus.forEach(menu => menu.hoistMenuToBody())
menus[0].setAnchorElement(document.querySelector(`#openSimulation`))
menus[1].setAnchorElement(document.querySelector('#openGates'))
menus[2].setAnchorElement(document.querySelector('#openFile'))
menus[3].setAnchorElement(document.querySelector('#openCustomGates'))

manager.update()
