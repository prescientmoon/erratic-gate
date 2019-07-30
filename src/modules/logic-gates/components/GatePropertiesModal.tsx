import './GateProperties.scss'
import React, { ChangeEvent, MouseEvent } from 'react'
import { getRendererSafely } from '../helpers/getRendererSafely'
import { Property } from '../../simulation/types/GateTemplate'
import { useObservable } from 'rxjs-hooks'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import CheckBox from '@material-ui/core/Checkbox'
import { open, id } from '../subjects/LogicGatePropsSubjects'
import { Gate } from '../../simulation/classes/Gate'

export interface GatePropertyProps {
    raw: Property
    gate: Gate
}

/**
 * Renders a single props of the gate
 *
 * @param param0 The props passed to the component
 */
export const GatePropery = ({ raw, gate }: GatePropertyProps) => {
    const { name } = raw
    const prop = gate.props[name]
    const outputSnapshot = useObservable(() => prop, '')

    const displayableName = `${name[0].toUpperCase()}${name.slice(1)}:`

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        let value: boolean | string | number = target.value

        if (raw.type === 'boolean') {
            value = target.checked
        } else if (raw.type === 'number') {
            value = Number(target.value)
        }

        if (raw.type !== 'boolean') {
            prop.next(value)
        }

        if (raw.needsUpdate === true) {
            gate.update()
        }
    }

    let input = <></>

    if (raw.type === 'number' || raw.type === 'text' || raw.type === 'string') {
        input = (
            <TextField
                onChange={handleChange}
                label={displayableName}
                value={outputSnapshot}
                type={raw.type}
                multiline={raw.type === 'string'}
                rowsMax={7}
            />
        )
    } else if (raw.type === 'boolean') {
        input = (
            <>
                <span className="checkbox-label">{displayableName}</span>
                <CheckBox
                    onClick={() => {
                        prop.next(!outputSnapshot)
                    }}
                    onChange={handleChange}
                    checked={!!outputSnapshot}
                />{' '}
            </>
        )
    }

    return <div className="gate-prop-container">{input}</div>
}

/**
 * The props page of any gate wich has props enabled
 *
 * @param props The react props of the component
 */
const GateProperties = () => {
    const openSnapshot = useObservable(() => open, false)
    const renderer = getRendererSafely()

    const node = renderer.simulation.gates.get(id.value)

    if (!(node && node.data && node.data.template.properties.enabled)) {
        open.next(false)
        return <></>
    }

    const gate = node.data

    return (
        <div
            id="gate-properties-modal"
            className={openSnapshot ? 'visible' : ''}
            onClick={() => {
                open.next(false)
            }}
        >
            <div
                id="gate-properties-container"
                onClick={e => {
                    e.stopPropagation()
                }}
            >
                <div id="gate-props-title">Gate properties</div>
                <Divider id="gate-props-divider" />

                {gate.template.properties.data.map((raw, index) => {
                    return (
                        <GatePropery
                            raw={raw}
                            gate={gate}
                            key={`${index}-${id.value}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default GateProperties
