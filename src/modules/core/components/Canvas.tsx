import React, { Component, createRef, Ref, RefObject } from 'react'
import FluidCanvas, { MouseEventInfo } from './FluidCanvas'
import loop from 'mainloop.js'
import { Gate } from '../../simulation/classes/Gate'
import { SimulationRenderer } from '../../simulation/classes/SimulationRenderer'
import { Subject } from 'rxjs'

class Canvas extends Component {
    private canvasRef: RefObject<HTMLCanvasElement> = createRef()
    private renderingContext: CanvasRenderingContext2D | null
    private renderer = new SimulationRenderer()

    public constructor(props: {}) {
        super(props)

        const foo = new Gate('blue')
        const bar = new Gate('green')

        foo.transform.position = [100, 100]
        foo.transform.scale = [70, 70]

        bar.transform.position = [200, 200]
        bar.transform.scale = [70, 70]

        this.renderer.simulation.push(foo, bar)

        loop.setDraw(() => {
            if (this.renderingContext)
                this.renderer.render(this.renderingContext)
        }).setUpdate(delta => this.renderer.update(delta))
    }

    public componentDidMount() {
        if (this.canvasRef.current)
            this.renderingContext = this.canvasRef.current.getContext('2d')

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
