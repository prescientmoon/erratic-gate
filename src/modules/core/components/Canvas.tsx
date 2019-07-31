import React, { Component, createRef, RefObject } from 'react'
import FluidCanvas from './FluidCanvas'
import loop from 'mainloop.js'
import { renderSimulation } from '../../simulationRenderer/helpers/renderSimulation'
import { getRendererSafely } from '../../logic-gates/helpers/getRendererSafely'

class Canvas extends Component {
    private canvasRef: RefObject<HTMLCanvasElement> = createRef()
    private renderingContext: CanvasRenderingContext2D | null

    public constructor(props: {}) {
        super(props)

        loop.setDraw(() => {
            if (this.renderingContext) {
                renderSimulation(this.renderingContext, getRendererSafely())
            }
        })
    }

    public componentDidMount() {
        if (this.canvasRef.current) {
            this.renderingContext = this.canvasRef.current.getContext('2d')

            if (this.renderingContext) {
                this.renderingContext.textAlign = 'center'
            }

            getRendererSafely().updateWheelListener(this.canvasRef)
        }

        loop.start()
    }

    public componentWillUnmount() {
        loop.stop()
    }

    public render() {
        const renderer = getRendererSafely()

        return (
            <FluidCanvas
                ref={this.canvasRef}
                mouseDownOuput={renderer.mouseDownOutput}
                mouseUpOutput={renderer.mouseUpOutput}
                mouseMoveOutput={renderer.mouseMoveOutput}
            />
        )
    }
}

export default Canvas
