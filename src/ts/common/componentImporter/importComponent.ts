import { ComponentTemplate } from '../componentManager/interfaces'
import { ComponentManager } from '../componentManager'
import { materialMode } from '../component/interfaces'
import { fecthAsJson } from './fetchJson'
import { getGist, getFirstFileFromGist } from './getGist'
import { evalImport } from './evalImport'

export interface Importable {
    name: string
    activation: string
    onClick?: string
    inputs: number
    outputs: number
    material: {
        mode: materialMode
        data: string
    }
}

const defaults: Importable = {
    activation: 'ctx.outputs[0].value = ctx.inputs[0].value',
    inputs: 1,
    outputs: 1,
    material: {
        mode: 'color',
        data: 'red'
    },
    name: 'Imported component'
}

export async function parseActivation(activaton: string) {
    const words = activaton.split(' ')

    if (words[0] === 'url') {
        return await evalImport<string>(words.slice(1).join(' '), 'js')
    } else {
        return activaton
    }
}

export async function importComponent(
    manager: ComponentManager,
    command: string
): Promise<ComponentTemplate> {
    const final: Importable = await evalImport(command)

    const template: ComponentTemplate = {
        ...defaults,
        ...final,
        editable: false,
        version: '1.0.0',
        imported: true,
        importCommand: command
    }

    template.activation = await parseActivation(template.activation)

    manager.templateStore.store.set(template.name, template)
    manager.succes(`Succesfully imported component ${template.name}`)

    return template
}
