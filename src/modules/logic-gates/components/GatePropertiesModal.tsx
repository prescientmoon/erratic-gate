import './GateProperties.scss'
import React, { ChangeEvent } from 'react'
import { getRendererSafely } from '../helpers/getRendererSafely'
import { Property, RawProp, isGroup } from '../../simulation/types/GateTemplate'
import { useObservable } from 'rxjs-hooks'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import CheckBox from '@material-ui/core/Checkbox'
import { open, id } from '../subjects/LogicGatePropsSubjects'
import { Gate, GateProps } from '../../simulation/classes/Gate'
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Icon from '@material-ui/core/Icon'
interface GatePropertyProps<T extends Property = Property> {
    raw: T
    gate: Gate
    props: GateProps
}

const emptyInput = <></>

const GateProperty = ({ raw, props, gate }: GatePropertyProps) => {
    if (isGroup(raw)) {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<Icon> expand_more</Icon>}
                    aria-controls={raw.groupName}
                    id={raw.groupName}
                >
                    <Typography>{raw.groupName}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="gate-prop-group-container">
                        {raw.props.map((propTemplate, index) => (
                            <GateProperty
                                key={index}
                                raw={propTemplate}
                                gate={gate}
                                props={props[raw.groupName] as GateProps}
                            />
                        ))}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    return <GateRawProperty raw={raw} gate={gate} props={props} />
}

/**
 * Renders a single props of the gate
 *
 * @param param0 The props passed to the component
 */
const GateRawProperty = ({
    props,
    raw,
    gate
}: GatePropertyProps & { raw: RawProp }) => {
    const { name } = raw
    const prop = props[raw.name] as BehaviorSubject<string | number | boolean>
    const outputSnapshot = useObservable(() => prop, '')

    // rerender when the external checkbox changes
    const external = useObservable(
        () =>
            gate.props.external.pipe(
                map((value) => value && name !== 'external')
            ),
        false
    )

    const displayableName = `${name[0].toUpperCase()}${name.slice(1)} ${
        external && name !== 'label' ? '(default value)' : ''
    }:`

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
    }

    let input = (() => {
        const root = gate.props[name] === prop
        const renderer = getRendererSafely()
        const displayExternal = () =>
            renderer.simulation.mode === 'ic' &&
            root &&
            !gate.template.properties.data.some(
                (prop) => (prop as RawProp).needsUpdate
            )

        if (
            (raw.name === 'external' && !displayExternal()) ||
            (raw.name === 'label' && (!external || !root))
        ) {
            return emptyInput
        }

        if (
            raw.type === 'number' ||
            raw.type === 'text' ||
            raw.type === 'string'
        ) {
            return (
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
            return (
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
    })()

    return (
        <div
            className={`gate-prop-container ${
                input !== emptyInput ? 'visible' : ''
            }`}
        >
            {input}
        </div>
    )
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
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <div id="gate-props-title">Gate properties</div>

                {gate.template.properties.data.map((prop, index) => {
                    return (
                        <GateProperty
                            props={gate.props}
                            raw={prop}
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
