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
import { initAutoSave } from './modules/simulation-actions/helpers/initAutoSave'

/**
 * The function wich does the heavy lifting for starting the app
 */
export const start = async () => {
  // This will resolve at the first render
  const result = loadSubject
    .pipe(
      filter((a) => a),
      take(1)
    )
    .toPromise()

  // Handle possible errors
  handleErrors()

  // Create main renderer for the app
  initRenderer()

  // Register key bindings
  initKeyBindings()

  // Update base templates
  initBaseTemplates()

  // Easter egg
  logWelcome()

  // Update the logic gates in local storage
  updateLogicGateList()

  // start the autosaving stuff
  initAutoSave()

  // Render app component
  render(<App />, document.getElementById('app'))

  // wait for the first render
  await result
}
