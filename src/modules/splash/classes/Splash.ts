import { querySelector } from '../../../common/dom/helpers/querySelector'
import { getSafeErrorStack } from '../../../common/lang/errors/helpers/getSafeErrorStack'
import './Splash.scss'

export class Splash {
    private element = querySelector<HTMLDivElement>('.Splash')

    public fade() {
        this.element.style.transition = '0.3s'
        this.element.style.opacity = '0'
        this.element.style.visibility = 'hidden'

        setTimeout(() => {
            this.element.remove()
        }, 300)
    }

    private createErrorDOM() {
        const root = document.createElement('div')
        root.className = 'error'

        const title = document.createElement('div')
        title.className = 'title'
        title.innerText = 'Oops! An error occurred.'

        const details = document.createElement('pre')
        details.className = 'details'

        const description = document.createElement('div')
        description.className = 'description'
        description.innerHTML = `
      <article class="Document">
        <p>Your browser might not be supported, or your data might be corrupt.
        Press "Clear data" below to reset the simulator and try again.</br>
        </br></br>
        We do not support the following browsers:</p>
        <ul>
          <li><span>Opera Mini</span></li>
          <li><span>Internet Explorer</span></li>
        </ul>
      </article>
    `

        const actions = document.createElement('div')
        actions.className = 'actions'

        root.appendChild(title)
        root.appendChild(details)
        root.appendChild(description)
        root.appendChild(actions)

        this.element.appendChild(root)
    }

    public setError(error: any) {
        this.createErrorDOM()

        const details = querySelector<HTMLDivElement>(
            '.Splash > .error > .details'
        )
        const actions = querySelector<HTMLDivElement>(
            '.Splash > .error > .actions'
        )

        details.innerText = getSafeErrorStack(error)
        actions.appendChild(this.getClearButton())

        this.element.classList.add('-hasError')
    }

    private getClearButton() {
        const clearButton = document.createElement('button')

        clearButton.classList.add('PrimaryButton')
        clearButton.textContent = 'Clear data'

        clearButton.addEventListener('click', () => {
            localStorage.clear()
            location.reload()
        })

        return clearButton
    }
}
