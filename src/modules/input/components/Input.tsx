import React from 'react'
import keycode from 'keycode'
import './Input.scss'

import { useObservable } from 'rxjs-hooks'
import { InputStore } from '../stores/InputStore'

const Input = () => {
    const open = useObservable(() => InputStore.data.open, false)
    const question = useObservable(() => InputStore.data.question, '')
    const output = useObservable(() => InputStore.data.output, '')

    const handleQuit = () => {
        InputStore.actions.next('quit')
    }

    return (
        <div
            id="input-container"
            onClick={handleQuit}
            className={open ? 'visible' : ''}
        >
            <div id="input-title">{question}</div>
            <input
                autoFocus={true}
                value={output}
                onClick={e => {
                    e.stopPropagation()
                }}
                type="text"
                id="actual-input"
                onChange={e => {
                    const element = e.target as HTMLInputElement

                    InputStore.data.output.next(element.value)
                }}
                onKeyDown={e => {
                    if (keycode('enter') === e.keyCode) {
                        e.preventDefault()
                        return InputStore.actions.next('submit')
                    }
                }}
            />
        </div>
    )
}

export default Input
