import { KeyboardInput } from '../classes/KeyboardInput'
import { KeyBindingMap, KeyBinding } from '../types/KeyBindingMap'
import { SidebarActions } from '../../simulation-actions/constants'
import { modalIsOpen } from '../../modals/helpers/modalIsOpen'

export const listeners: Record<string, KeyboardInput> = {}

const keyBindings = Object.values(SidebarActions)
    .filter((action) => action.keybinding)
    .map(
        (action): KeyBinding => {
            return {
                actions: [action.action],
                keys: action.keybinding || []
            }
        }
    )

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

    window.addEventListener('keydown', (e) => {
        if (!modalIsOpen() && location.pathname === '/') {
            const current: {
                keys: string[]
                callback: Function
            }[] = []

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

                current.push({
                    keys: keyBinding.keys,
                    callback: () => {
                        for (const action of keyBinding.actions) {
                            action()
                        }
                    }
                })
            }

            if (current.length) {
                let maxIndex = 0
                let max = current[0].keys.length

                for (let index = 1; index < current.length; index++) {
                    const element = current[index]

                    if (element.keys.length > max) {
                        max = element.keys.length
                        maxIndex = index
                    }
                }

                current[maxIndex].callback()

                e.preventDefault()
                e.stopPropagation()
            }
        }
    })
}
