import React from 'react'
import App from './modules/core/components/App'

import { render } from 'react-dom'
import { handleErrors } from './modules/errors/helpers/handleErrors'
import { initKeyBindings } from './modules/keybindings/helpers/initialiseKeyBindings'
import { initBaseTemplates } from './modules/saving/helpers/initBaseTemplates'
import { loadSubject } from './modules/core/subjects/loadedSubject'
import { take } from 'rxjs/operators'

export const start = async () => {
    console.clear()

    const result = loadSubject.pipe(take(1)).toPromise()

    handleErrors()
    initKeyBindings()
    initBaseTemplates()

    render(<App />, document.getElementById('app'))

    await result
}
