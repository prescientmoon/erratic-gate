import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const EnglishTranslation: Translation = {
    language: 'english',
    sidebar: {
        createSimulation: 'Create simulation',
        logicGates: 'Logic gates',
        openSimulation: 'Open simulations',
        simulation: 'Simulation',
        language: 'Language',
        backToSimulation: 'Back to simulation',
        backToGates: 'Back to logic gates'
    },
    createSimulation: {
        mode: {
            question: 'What kind of simulation do you want to create?',
            options: {
                ic: 'Integrated circuit',
                project: 'Project'
            }
        },
        name: {
            question: 'What do you want your simulation to be called?'
        }
    },
    actions: {
        save: 'Save',
        clean: 'Clean',
        refresh: 'Refresh',
        undo: 'Undo',
        paste: 'Paste',
        copy: 'Copy',
        duplicate: 'Duplicate',
        cut: 'Cut',
        'select all': 'Select all',
        'delete selection': 'Delete selection',
        'delete simulation': 'Delete simulation'
    },
    messages: {
        createdSimulation: name => `Succesfully created simulation '${name}'`,
        switchedToSimulation: name =>
            `Succesfully switched to simulation '${name}'`,
        savedSimulation: name => `Succesfully saved simulation '${name}'`,
        compiledIc: name => `Succesfully compiled circuit '${name}'`,
        cleaned: name => `Succesfully cleaned simulation '${name}'`,
        refreshed: name => `Succesfully refreshed simulation '${name}'`,
        undone: name => `Succesfully undone simulation '${name}'`,
        deletedSimulation: name => `Succesfully deleted simulation '${name}'`,
        addedGate: name => `Succesfully added gate '${name}'`
    }
}
