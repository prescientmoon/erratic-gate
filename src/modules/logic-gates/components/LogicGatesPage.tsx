import './LogicGatesPage.scss'
import React from 'react'
import { useObservable } from 'rxjs-hooks'
import { LogicGateList } from '../subjects/LogicGateList'
import { getTemplateSafely } from '../helpers/getTemplateSafely'
import { getRendererSafely } from '../helpers/getRendererSafely'
import LogicGate from './LogicGate'

/**
 * The component containing the info / actions about all logic gates
 */
const LogicGatePage = () => {
    const gates = useObservable(() => LogicGateList, [])
    const renderer = getRendererSafely()
    console.log('got this far')

    return (
        <main>
            <div className="page" id="gates-page">
                <div className="gate-grid">
                    {gates
                        .map(getTemplateSafely)
                        .sort((a, b) => a.category - b.category)
                        .filter((template) => {
                            return (
                                renderer.simulation.mode === 'project' ||
                                template.metadata.name !==
                                    renderer.simulation.name
                            )
                        })
                        .map((template, index) => {
                            return <LogicGate key={index} template={template} />
                        })}
                </div>
            </div>
        </main>
    )
}

export default LogicGatePage
