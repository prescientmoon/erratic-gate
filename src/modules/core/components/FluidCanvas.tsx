import React, { RefObject, forwardRef, MouseEvent } from 'react'
import { useObservable } from 'rxjs-hooks'
import { Screen } from '../classes/Screen'
import { Subject } from 'rxjs'
import { vector2 } from '../../simulation/classes/Transform'

const screen = new Screen()

export interface MouseEventInfo {
    position: vector2
    button: number
}

export interface FluidCanvasProps {
    mouseDownOuput: Subject<MouseEventInfo>
    mouseUpOutput: Subject<MouseEventInfo>
    mouseMoveOutput: Subject<MouseEventInfo>
}

export const getEventInfo = (
    e: MouseEvent<HTMLCanvasElement>
): MouseEventInfo => {
    return {
        button: e.button,
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
        const width = useObservable(() => screen.width, 0)
        const height = useObservable(() => screen.height, 0)

        return (
            <canvas
                ref={ref}
                width={width}
                height={height}
                onMouseDown={mouseEventHandler(props.mouseDownOuput)}
                onMouseUp={mouseEventHandler(props.mouseUpOutput)}
                onMouseMove={mouseEventHandler(props.mouseMoveOutput)}
            />
        )
    }
)

export default FluidCanvas
