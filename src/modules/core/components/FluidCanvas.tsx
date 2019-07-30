import React, { RefObject, forwardRef, MouseEvent, WheelEvent } from 'react'
import { useObservable } from 'rxjs-hooks'
import { Subject } from 'rxjs'
import { MouseEventInfo } from '../types/MouseEventInfo'
import { width, height } from '../../screen/helpers/Screen'
import { getEventInfo } from '../helpers/getEventInfo'

export interface FluidCanvasProps {
    mouseDownOuput: Subject<MouseEventInfo>
    mouseUpOutput: Subject<MouseEventInfo>
    mouseMoveOutput: Subject<MouseEventInfo>
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
                className="page"
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
