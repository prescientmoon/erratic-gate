import React, { Component, createRef, Ref, RefObject } from 'react'
import FluidCanvas from './FluidCanvas'
import loop from 'mainloop.js'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { renderSimulation } from '../../simulationRenderer/helpers/renderSimulation'
import { rendererSubject } from '../subjects/rendererSubject'
import { loadSubject } from '../subjects/loadedSubject'

class Canvas extends Component {
    private canvasRef: RefObject<HTMLCanvasElement> = createRef()
    private renderingContext: CanvasRenderingContext2D | null
    private renderer = new SimulationRenderer(this.canvasRef)

    public constructor(props: {}) {
        super(props)

        rendererSubject.next(this.renderer)

        loop.setDraw(() => {
            if (this.renderingContext) {
                renderSimulation(this.renderingContext, this.renderer)
            }
        })
    }

    public componentDidMount() {
        loadSubject.next(true)

        if (this.canvasRef.current) {
            this.renderingContext = this.canvasRef.current.getContext('2d')
            this.renderer.updateWheelListener()
        }

        loop.start()
    }

    public componentWillUnmount() {
        loop.stop()
    }

    public render() {
        return (
            <FluidCanvas
                ref={this.canvasRef}
                mouseDownOuput={this.renderer.mouseDownOutput}
                mouseUpOutput={this.renderer.mouseUpOutput}
                mouseMoveOutput={this.renderer.mouseMoveOutput}
            />
        )
    }
}

export default Canvas
