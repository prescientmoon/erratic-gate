import React from 'react'
import App from './modules/core/components/App'

import { render } from 'react-dom'
import { handleErrors } from './modules/errors/helpers/handlErrors'

render(<App />, document.getElementById('app'))

handleErrors()
