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
        simulation: 'Simulatie',
        language: 'Taal',
        backToSimulation: 'Terug naar simulatie',
        backToGates: 'Terug naar poorten'
    },
    actions: {
        'delete selection': 'Delete selectie',
        'select all': 'Selecteer alles',
        clean: 'Verwijder',
        refresh: 'Ververs',
        save: 'opslaan',
        undo: 'ongedaan maken',
        'delete simulation': 'Delete simulatie',
        copy: 'Kopieer',
        cut: 'Knippen',
        duplicate: 'Dupliceer',
        paste: 'Plak'
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
        savedSimulation: name => "Simulatie succesvol opgeslagen '${name}'",
        compiledIc: name => "IC gecompileerd: '${name}'",
        cleaned: name => `'${name}' gewist`,
        refreshed: name => `'${name}' ververst`,
        undone: name => `'${name}' ongedaan gemaakt`,
        deletedSimulation: name => `Simulatie '${name}' verwijderd`,
        addedGate: name => `Poort '${name}' toegevoegd`
    }
}
