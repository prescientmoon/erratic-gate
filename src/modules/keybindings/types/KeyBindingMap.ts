export interface KeyBinding {
    keys: string[]
    actions: Function[]
}

export type KeyBindingMap = KeyBinding[]
