import { MouseEvent } from 'react'
import { MouseEventInfo } from '../types/MouseEventInfo'
import { mouseButton } from '../types/mouseButton'

/**
 * Extracts the bareminimum from a mouseEvent instance
 *
 * @param e The MouseEvent instance
 */
export const getEventInfo = (
    e: MouseEvent<HTMLCanvasElement | HTMLDivElement>
): MouseEventInfo => {
    return {
        button: e.button as mouseButton,
        position: [e.clientX, e.clientY]
    }
}
