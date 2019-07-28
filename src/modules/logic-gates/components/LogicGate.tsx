import './LogicGate.scss'
import React from 'react'
import { GateTemplate } from '../../simulation/types/GateTemplate'
import GateInfo from './GateInfo'
import GateSettings from './GateSettings'
import AddGate from './AddGate'
import { addGateFromTemplate } from '../helpers/addGateFromTemplate'
import { repeat } from '../../vector2/helpers/repeat'

export interface LogicGateProps {
    template: GateTemplate
}

const gradientSmoothness = 10

const LogicGate = ({ template }: LogicGateProps) => {
    const { fill } = template.material

    const gatePreview =
        template.material.type === 'image' ? (
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

    const rawName = template.metadata.name
    const name = `${rawName[0].toUpperCase()}${rawName.substr(1)}`

    return (
        <div className="gate">
            <section>
                <div
                    className="gate-preview"
                    onClick={() => addGateFromTemplate(template)}
                >
                    {gatePreview}
                </div>
            </section>
            <section>
                <div className="gate-name">{name}</div>
            </section>
            <section>
                <div className="gate-icons">
                    <GateInfo template={template} />
                    <GateSettings template={template} />
                    <AddGate template={template} />
                </div>
            </section>
        </div>
    )
}

export default LogicGate
