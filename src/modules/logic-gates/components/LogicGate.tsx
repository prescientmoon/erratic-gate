import './LogicGate.scss'
import React from 'react'
import GateInfo from './GateInfo'
import AddGate from './AddGate'
import { addGateFromTemplate } from '../helpers/addGateFromTemplate'
import DeleteGateIcon from './DeleteGate'
import GatePreview from './GatePreview'
import { LogicGateProps } from '../types/LogicGateProps'
import { firstCharUpperCase } from '../../../common/lang/strings/firstCharUpperCase'

const LogicGate = ({ template }: LogicGateProps) => {
    const rawName = template.metadata.name
    const name = firstCharUpperCase(rawName)

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
                    {!template.tags.includes('integrated') && (
                        <GateInfo name={name} />
                    )}
                    <AddGate template={template} />
                    <DeleteGateIcon template={template} />
                </div>
            </section>
        </div>
    )
}

export default LogicGate
