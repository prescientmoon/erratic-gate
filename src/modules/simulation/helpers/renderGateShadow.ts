import { Gate } from '../classes/Gate'
import { projectPointOnPlane } from './projectPoint'
import { drawPolygon } from './drawPolygon'
import { vector3, vector2, vector4, vector8 } from '../classes/Transform'
import { checkIntersection } from 'line-intersect'
import { reverseArray } from './reverseArray'
import { length, add, invert } from '../../vector2/helpers/basic'

export const pointRecivesLight = (
    points: vector2[], //this needs to have an even length
    light: vector3,
    index: number,
    ctx: CanvasRenderingContext2D
) => {
    const point = points[index]
    const oposittePoint = points[(index + points.length / 2) % points.length]

    const edgesToCheck = [
        [oposittePoint, points[(index + 1) % points.length]],
        [oposittePoint, points[index === 0 ? points.length - 1 : index - 1]]
    ].map(points => points.flat() as vector4)

    for (const edge of edgesToCheck) {
        const intersectionCheckParameters = [
            [light[0], light[1]],
            point,
            edge
        ].flat() as vector8

        const result = checkIntersection(...intersectionCheckParameters).type

        if (result === 'intersecting') {
            return false
        }
    }

    return true
}

export const renderGateShadow = (
    ctx: CanvasRenderingContext2D,
    color: string,
    gate: Gate,
    gateHeight: number,
    light: vector3
) => {
    ctx.fillStyle = color

    const points = gate.transform.getPoints()
    const exposedPoints = points.filter((point, index) =>
        pointRecivesLight(points, light, index, ctx)
    )

    let includedPoints = [...points]

    if (exposedPoints.length === 3) {
        let min = Infinity
        let current: null | vector2 = null

        for (const point of exposedPoints) {
            const size = length(
                add(point, invert(light.slice(0, 2) as vector2))
            )

            if (size < min) {
                min = size
                current = point
            }
        }

        if (current) {
            includedPoints.splice(includedPoints.indexOf(current), 1)
        }

        if (
            includedPoints[0][1] < light[1] &&
            includedPoints[1][1] < light[1] &&
            !(includedPoints[2][1] > light[1])
        ) {
            const temporary = includedPoints[0]
            includedPoints[0] = includedPoints[1]
            includedPoints[1] = temporary
        }
    }

    if (exposedPoints.length === 2) {
        includedPoints = points.filter(
            point => exposedPoints.indexOf(point) === -1
        )
    }

    const projections = includedPoints.map(point =>
        // ts doesnt let me do [...point, gateHeight]
        projectPointOnPlane([point[0], point[1], gateHeight], light)
    )

    const polygon = [includedPoints, reverseArray(projections)].flat()

    drawPolygon(ctx, polygon)

    ctx.fillStyle = 'red'
    for (const point of [...includedPoints, ...projections, light]) {
        ctx.beginPath()
        ctx.ellipse(point[0], point[1], 10, 10, 0, 0, Math.PI * 2)
        ctx.fill()
    }

    ctx.strokeStyle = 'yellow'
    drawPolygon(ctx, points, false, true)
}
