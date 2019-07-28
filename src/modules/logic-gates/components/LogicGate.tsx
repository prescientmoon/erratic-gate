import './LogicGate.scss'
import React from 'react'
import GateInfo from './GateInfo'
import GateSettings from './GateSettings'
import AddGate from './AddGate'
import { addGateFromTemplate } from '../helpers/addGateFromTemplate'
import DeleteGateIcon from './DeleteGate'
import GatePreview from './GatePreview'
import { LogicGateProps } from '../types/LogicGateProps'

const LogicGate = ({ template }: LogicGateProps) => {
    const rawName = template.metadata.name
    const name = `${rawName[0].toUpperCase()}${rawName.substr(1)}`

    return (
        <div className="gate">
            <section>
                <div
                    className="gate-preview"
                    onClick={() => addGateFromTemplate(template)}
                >
                    <GatePreview template={template} />
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
                    <DeleteGateIcon template={template} />
                </div>
            </section>
        </div>
    )
}

export default LogicGate
