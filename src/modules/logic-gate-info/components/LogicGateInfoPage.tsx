import React, { Fragment } from 'react'
import '../../logic-gates/components/GatePreview.scss'
import './LogicGateInfoPage.scss'
import { withRouter, Redirect } from 'react-router'
import GatePreview from '../../logic-gates/components/GatePreview'
import { getTemplateSafely } from '../../logic-gates/helpers/getTemplateSafely'
import { firstCharUpperCase } from '../../../common/lang/strings/firstCharUpperCase'
import { descriptions } from '../data/descriptions'
import LogicGateIoTable from './LogicGateIoTable'

export default withRouter(props => {
    try {
        const name = props.match.params.name.toLowerCase()
        const template = getTemplateSafely(name)
        const description = descriptions[name] || ''

        console.log({ name, template })

        return (
            <div className="page" id="logic-gate-info-page">
                <div className="gate-preview">
                    <GatePreview template={template} />
                </div>
                <div id="gate-info-top-right">
                    <div id="gate-info-title">{firstCharUpperCase(name)}</div>
                    <div className="gate-info-description">{description}</div>
                </div>
                <div id="gate-info-io-table">
                    <LogicGateIoTable name={name} />
                </div>
                {template.info.length ? (
                    <div id="gate-info-read-more">
                        Read more: <br />
                        {template.info.map((url, index) => {
                            return (
                                <Fragment key={index}>
                                    <a target="_blank" href={url}>
                                        {url}
                                    </a>
                                    <br />
                                </Fragment>
                            )
                        })}
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    } catch {
        return <Redirect to="/gates" />
    }
})
