import { render, html } from "lit-html"
import { confirmModalOptions } from "./interfaces";
import { fromEvent } from "rxjs";
import MicroModal from "micromodal"

let lastId = 0

export const modal = (options: Partial<confirmModalOptions>) => new Promise((res, rej) => {
    const defaultOptions = {
        yes: "yes",
        no: "no",
        title: "modal",
        content: html`Hello world!`
    }

    const parent = document.getElementsByClassName("ModalContainer")[0]
    const finalOptions: confirmModalOptions = { ...defaultOptions, ...options }
    const id = lastId++

    if (!parent)
        rej(false)

    const template = html`
    <div class="modal micromodal-slide" id="modal-${id}" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
            <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                <header class="modal__header">
                    <h2 class="modal__title" id="modal-${id}-title">
                        ${finalOptions.title}
                    </h2>
                    <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                </header>
                <main class="modal__content" id="modal-${id}-content">
                    ${finalOptions.content}
                </main>
                <footer class="modal__footer">
                    <button class="modal__btn" id="yes-${id}">${finalOptions.yes}</button>
                    <button class="modal__btn modal__btn-primary" id="no-${id}" aria-label="Close this dialog window">
                        ${finalOptions.no}
                    </button>
                </footer>
            </div>
        </div>
    </div>
    </div>
    `

    render(template, parent)

    const yes = document.getElementById(`yes-${id}`)
    const no = document.getElementById(`no-${id}`)

    const clear = () => {
        // render(html``,parent)
        MicroModal.close()
        subscriptions.forEach(val => val.unsubscribe())
    }

    const subscriptions = [
        fromEvent(yes, "click").subscribe(val => {
            clear()
            res(true)
        }),
        fromEvent(no, "click").subscribe(val => {
            clear()
            res(false)
        })
    ]

    MicroModal.show(`modal-${id}`)
})












