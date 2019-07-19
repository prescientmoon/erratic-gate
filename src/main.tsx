import React from 'react'
import App from './modules/core/components/App'

import { render } from 'react-dom'
import { handleErrors } from './modules/errors/helpers/handleErrors'
import { initKeyBindings } from './modules/keybindings/helpers/initialiseKeyBindings'
import { initBaseTemplates } from './modules/saving/helpers/initBaseTemplates'

handleErrors()
initKeyBindings()
initBaseTemplates()

render(<App />, document.getElementById('app'))
