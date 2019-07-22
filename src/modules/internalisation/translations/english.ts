import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const EnglishTranslation: Translation = {
    language: 'english',
    sidebar: {
        createSimulation: 'Create simulation',
        logicGates: 'Logic gates',
        openSimulation: 'Open simulations'
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
    messages: {
        createdSimulation: name => `Succesfully created simulation '${name}'`,
        switchedToSimulation: name =>
            `Succesfully switched to simulation '${name}'`,
        savedSimulation: name => `Succesfully saved simulation '${name}'`
    }
}
