import { Translation } from '../types/TranslationInterface'

/**
 * The romanian translation
 */
export const RomanianTranslation: Translation = {
    language: 'română',
    sidebar: {
        createSimulation: 'Creează o simulație',
        openSimulation: 'Deschide o simulație',
        logicGates: 'Porți logice'
    },
    createSimulation: {
        mode: {
            question: 'Ce fel de simulație vrei să creiezi?',
            options: {
                ic: 'Circuit integrat',
                project: 'Proiect'
            }
        },
        name: {
            question: 'Cum vrei să numești simulația?'
        }
    },
    messages: {
        createdSimulation: name =>
            `Simulația '${name}' a fost creiată cu succes`,
        switchedToSimulation: name =>
            `Simulația '${name}' a fost deschisă cu succes`,
        savedSimulation: name => `Simulația '${name}' a fost salvată cu succes`
    }
}
