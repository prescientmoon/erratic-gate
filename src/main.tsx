import React from 'react'
import App from './modules/core/components/App'

import { render } from 'react-dom'
import { handleErrors } from './modules/errors/helpers/handleErrors'
import { initKeyBindings } from './modules/keybindings/helpers/initialiseKeyBindings'
import { initBaseTemplates } from './modules/saving/helpers/initBaseTemplates'
import { loadSubject } from './modules/core/subjects/loadedSubject'
import { take, filter } from 'rxjs/operators'
import { logWelcome } from './modules/core/helpers/logWelcome'
import { initRenderer } from './modules/simulationRenderer/helpers/initRenderer'
import { updateLogicGateList } from './modules/logic-gates/subjects/LogicGateList'

export const start = async () => {
    const result = loadSubject
        .pipe(
            filter(a => a),
            take(1)
        )
        .toPromise()

    handleErrors()
    initRenderer()
    initKeyBindings()
    initBaseTemplates()
    logWelcome()
    updateLogicGateList()

    render(<App />, document.getElementById('app'))

    await result
}
