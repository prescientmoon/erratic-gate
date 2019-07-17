import React, { Component, createRef, Ref, RefObject } from 'react'
import FluidCanvas from './FluidCanvas'
import loop from 'mainloop.js'
import { Gate } from '../../simulation/classes/Gate'
import { SimulationRenderer } from '../../simulationRenderer/classes/SimulationRenderer'
import { renderSimulation } from '../../simulationRenderer/helpers/renderSimulation'
import { updateSimulation } from '../../simulationRenderer/helpers/updateSimulation'

class Canvas extends Component {
    private canvasRef: RefObject<HTMLCanvasElement> = createRef()
    private renderingContext: CanvasRenderingContext2D | null
    private renderer = new SimulationRenderer()

    public constructor(props: {}) {
        super(props)

        const foo = new Gate({
            material: {
                value: 'blue'
            }
        })
        const bar = new Gate({
            material: {
                value: 'green'
            }
        })

        foo.transform.position = [100, 100]
        foo.transform.scale = [100, 100]

        bar.transform.position = [400, 200]
        bar.transform.scale = [100, 100]

        this.renderer.simulation.push(foo, bar)

        loop.setDraw(() => {
            if (this.renderingContext) {
                renderSimulation(this.renderingContext, this.renderer)
            }
        }).setUpdate(delta => updateSimulation(this.renderer, delta))
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
