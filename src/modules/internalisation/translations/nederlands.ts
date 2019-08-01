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
        language: 'Taal',
        backToSimulation: 'Todo',
        backToGates: 'Todo'
    },
    actions: {
        'delete selection': 'Todo',
        'select all': 'Todo',
        clean: 'Todo',
        refresh: 'Todo',
        save: 'Todo',
        undo: 'Todo',
        'delete simulation': `Todo`,
        copy: 'Todo',
        cut: 'Todo',
        duplicate: 'Todo',
        paste: 'Todo'
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
        compiledIc: name => `IC gecompileerd: ${name}`,
        cleaned: name => `${name} gewist`,
        refreshed: name => `${name} ververst`,
        undone: name => `${name} ongedaan gemaakt`,
        deletedSimulation: name => `Todo`,
        addedGate: name => 'Todo'
    }
}
