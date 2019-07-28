import React from 'react'
import { LogicGateProps } from '../types/LogicGateProps'
import { repeat } from '../../vector2/helpers/repeat'

const gradientSmoothness = 10

const GatePreview = ({ template }: LogicGateProps) => {
    const { fill } = template.material

    return template.material.type === 'image' ? (
        <img src={fill} alt={template.metadata.name} />
    ) : (
        <div
            style={{
                backgroundColor: fill,
                backgroundImage: `linear-gradient(-60deg,${[
                    ...Object.values(template.material.colors)
                        .map(color => repeat(color, gradientSmoothness))
                        .flat(),
                    ...repeat(fill, gradientSmoothness)
                ].join(',')})`
            }}
        />
    )
}

export default GatePreview
