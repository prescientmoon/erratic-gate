import { Gate } from '../classes/Gate'
import { projectPointOnPlane } from './projectPoint'
import { drawPolygon } from './drawPolygon'
import { vector3, vector2, vector4, vector8 } from '../classes/Transform'
import { checkIntersection } from 'line-intersect'
import { reverseArray } from './reverseArray'
import { minVector, maxVector } from '../../vector2/helpers/minmaxVector'
import { relativeTo } from '../../vector2/helpers/basic'

export const pointRecivesLight = (
    points: vector2[], //this needs to have an even length
    light: vector3,
    index: number
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
        pointRecivesLight(points, light, index)
    )

    let includedPoints = [...points]

    if (exposedPoints.length === 4) {
        return
    }

    if (exposedPoints.length === 3) {
        const minimum = minVector(
            ...exposedPoints.map(point =>
                relativeTo(point, light.slice(0, 2) as vector2)
            )
        )

        includedPoints.splice(includedPoints.indexOf(exposedPoints[minimum]), 1)
    }

    if (includedPoints.length === 3) {
        const maximum = maxVector(
            ...includedPoints.map(point =>
                relativeTo(point, light.slice(0, 2) as vector2)
            )
        )

        const otherIndices = [(maximum + 1) % 3, (maximum + 2) % 3]
        const newIndices = [otherIndices[0], maximum, otherIndices[1]]

        includedPoints = newIndices.map(index => includedPoints[index])
    }

    let projections = includedPoints.map(point =>
        // ts doesnt let me do [...point, gateHeight]
        projectPointOnPlane([point[0], point[1], gateHeight], light)
    )

    if (exposedPoints.length === 2) {
        const toProject = includedPoints.filter(
            point => exposedPoints.indexOf(point) === -1
        )

        projections = toProject.map(point =>
            projectPointOnPlane([point[0], point[1], gateHeight], light)
        )

        includedPoints = reverseArray(exposedPoints)

        const firstIncludedIndex = points.indexOf(toProject[0])
        const firstExposedPointIndex = points.indexOf(includedPoints[0])

        if ((firstIncludedIndex + 2) % 4 === firstExposedPointIndex % 4) {
            const temporary = includedPoints[0]
            includedPoints[0] = includedPoints[1]
            includedPoints[1] = temporary
        }
    }

    const polygon = [includedPoints, reverseArray(projections)].flat()

    drawPolygon(ctx, polygon)
}
