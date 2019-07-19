import { keyBindings } from '../constants'
import { KeyboardInput } from '../classes/KeyboardInput'
import { KeyBindingMap } from '../types/KeyBindingMap'

export const listeners: Record<string, KeyboardInput> = {}

export const initKeyBindings = (bindings: KeyBindingMap = keyBindings) => {
    const allKeys = new Set<string>()

    for (const binding of bindings) {
        for (const key of binding.keys) {
            allKeys.add(key)
        }
    }

    for (const key of allKeys.values()) {
        listeners[key] = new KeyboardInput(key)
    }

    window.addEventListener('keydown', e => {
        for (const keyBinding of bindings) {
            let done = false

            for (const key of keyBinding.keys) {
                if (!(done || listeners[key].value)) {
                    done = true
                    break
                }
            }

            if (done) {
                continue
            }

            for (const action of keyBinding.actions) {
                action()
            }

            e.preventDefault()
            e.stopPropagation()
        }
    })
}
