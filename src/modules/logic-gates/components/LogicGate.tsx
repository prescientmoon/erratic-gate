import './LogicGate.scss'
import React from 'react'
import { GateTemplate } from '../../simulation/types/GateTemplate'
import GateInfo from './GateInfo'
import GateSettings from './GateSettings'
import AddGate from './AddGate'

export interface LogicGateProps {
    template: GateTemplate
}

const LogicGate = ({ template }: LogicGateProps) => {
    const gatePreview =
        template.material.type === 'image' ? (
            <img src={template.material.fill} alt={template.metadata.name} />
        ) : (
            <div
                style={{
                    backgroundColor: template.material.fill
                }}
            />
        )

    const rawName = template.metadata.name
    const name = `${rawName[0].toUpperCase()}${rawName.substr(1)}`

    return (
        <div className="gate">
            <section>
                <div className="gate-preview">{gatePreview}</div>
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
