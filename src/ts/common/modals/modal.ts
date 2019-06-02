import { render, html } from "lit-html"
import { confirmModalOptions } from "./interfaces";
import { fromEvent } from "rxjs";
import { MDCDialog } from '@material/dialog';

let lastId = 0

export const modal = (options: Partial<confirmModalOptions>) => new Promise((res, rej) => {
    const defaultOptions = {
        yes: "yes",
        no: "no",
        title: "modal",
        content: html`Hello world!`
    }

    const parent = document.getElementsByClassName("ModalContainer")[0]
    const { title, content, yes, no }: confirmModalOptions = { ...defaultOptions, ...options }
    const id = lastId++

    if (!parent)
        rej(false)

    const template = html`
    <div class="mdc-dialog"
     id="modal-${id}"
     role="alertdialog"
     aria-modal="true"
     aria-labelledby="${title}"
     aria-describedby="my-dialog-content">
        <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface">
                <h2 class="mdc-dialog__title" id="${title}">
                    ${title}
                </h2>
                <div class="mdc-dialog__content" id="my-dialog-content">
                    ${content}
                </div>
                <footer class="mdc-dialog__actions">
                    <button type="button" class="mdc-button mdc-dialog__button" id="no-${id}">
                        <span class="mdc-button__label">${no}</span>
                    </button>
                    <button type="button" class="mdc-button mdc-dialog__button" id="yes-${id}">
                        <span class="mdc-button__label">${yes}</span>
                    </button>
                </footer>
            </div>
        </div>
        <div class="mdc-dialog__scrim"></div>
        </div>
    `

    render(template, parent)

    const dialog = new MDCDialog(document.querySelector(`#modal-${id}`))
    dialog.open()

    const _yes = document.getElementById(`yes-${id}`)
    const _no = document.getElementById(`no-${id}`)

    const clear = () => {
        // render(html``,parent)
        dialog.close()
        subscriptions.forEach(val => val.unsubscribe())
    }

    const subscriptions = [
        fromEvent(_yes, "click").subscribe(val => {
            clear()
            res(true)
        }),
        fromEvent(_no, "click").subscribe(val => {
            clear()
            res(false)
        })
    ]
})












