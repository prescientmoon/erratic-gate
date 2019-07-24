import { Translation } from '../types/TranslationInterface'

/**
 * The dutch translation
 */
export const DutchTranslation: Translation = {
    language: 'dutch',
    sidebar: {
        createSimulation: 'Maak simulatie',
        logicGates: 'Logische poorten',
        openSimulation: 'Open simulatie',
        simulation: 'Todo',
        language: 'Taal'
    },
    createSimulation: {
        mode: {
            question: 'Wat voor simulatie wil je maken?',
            options: {
                // ic: 'Geïntegreerde schakeling',
                ic: 'IC',
                project: 'Project'
            }
        },
        name: {
            question: 'Hoe wil je je simulatie noemen?'
        }
    },
    messages: {
        createdSimulation: name => `Simulatie '${name}' succesvol gecreerd`,
        switchedToSimulation: name =>
            `Succesvol veranderd naar simulatie '${name}'`,
        savedSimulation: name => `Simulatie succesvol opgeslagen '${name}'`,
        compiledIc: name => `Todo: ${name}`
    }
}
