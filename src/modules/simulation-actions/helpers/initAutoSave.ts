import { interval } from 'rxjs'
import { save } from '../../saving/helpers/save'
import { getRendererSafely } from '../../logic-gates/helpers/getRendererSafely'

const everySecond = interval(1000)

export const initAutoSave = () => {
    everySecond.subscribe(() => {
        const renderer = getRendererSafely()
        save(renderer)
    })
}
