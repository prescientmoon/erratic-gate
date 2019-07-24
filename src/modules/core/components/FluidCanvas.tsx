import React, { RefObject, forwardRef, MouseEvent, WheelEvent } from 'react'
import { useObservable } from 'rxjs-hooks'
import { Subject } from 'rxjs'
import { mouseButton } from '../types/mouseButton'
import { MouseEventInfo } from './MouseEventInfo'
import { width, height } from '../../screen/helpers/Screen'

export interface FluidCanvasProps {
    mouseDownOuput: Subject<MouseEventInfo>
    mouseUpOutput: Subject<MouseEventInfo>
    mouseMoveOutput: Subject<MouseEventInfo>
}

export const getEventInfo = (
    e: MouseEvent<HTMLCanvasElement>
): MouseEventInfo => {
    return {
        button: e.button as mouseButton,
        position: [e.clientX, e.clientY]
    }
}

export const mouseEventHandler = (output: Subject<MouseEventInfo>) => (
    e: MouseEvent<HTMLCanvasElement>
) => {
    output.next(getEventInfo(e))
}

const FluidCanvas = forwardRef(
    (props: FluidCanvasProps, ref: RefObject<HTMLCanvasElement>) => {
        const currentWidth = useObservable(() => width, 0)
        const currentHeight = useObservable(() => height, 0)

        return (
            <canvas
                ref={ref}
                width={currentWidth}
                height={currentHeight}
                onMouseDown={mouseEventHandler(props.mouseDownOuput)}
                onMouseUp={mouseEventHandler(props.mouseUpOutput)}
                onMouseMove={mouseEventHandler(props.mouseMoveOutput)}
            />
        )
    }
)

export default FluidCanvas
