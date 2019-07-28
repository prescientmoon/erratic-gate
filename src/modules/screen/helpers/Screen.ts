import { Transform } from '../../../common/math/classes/Transform'
import { BehaviorSubject, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { getWidth } from '../helpers/getWidth'
import { sidebarWidth } from '../../core/constants'

const width = new BehaviorSubject(getWidth())
const height = new BehaviorSubject(window.innerHeight)

const resize = fromEvent(window, 'resize')

resize.pipe(map(getWidth)).subscribe(val => width.next(val))
resize.pipe(map(() => window.innerHeight)).subscribe(val => height.next(val))

/**
 * The main screen transform
 */
const Screen = new Transform()

width.subscribe(currentWidth => {
    Screen.width = currentWidth
})

height.subscribe(currentHeight => {
    Screen.height = currentHeight
})

export { Screen, height, width }
