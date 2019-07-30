import { BehaviorSubject } from 'rxjs'

/**
 * Behavior subject holding the curentCnvasRenderingContext2d
 */
export const currentContext = new BehaviorSubject<null | CanvasRenderingContext2D>(
    null
)
