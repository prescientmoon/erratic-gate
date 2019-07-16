import { Gate } from '../classes/Gate'
import { projectPointOnPlane } from './projectPoint'
import { drawPolygon } from './drawPolygon'
import { vector3 } from '../classes/Transform'

export const renderGateShadow = (
    ctx: CanvasRenderingContext2D,
    color: string,
    gate: Gate,
    gateHeight: number,
    light: vector3
) => {
    ctx.fillStyle = color

    const points = gate.transform.getPoints()
    const projections = points.map(point =>
        projectPointOnPlane([point[0], point[1], gateHeight], light)
    )

    drawPolygon(ctx, projections)
}
