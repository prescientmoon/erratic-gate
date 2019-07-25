import { Translation } from '../types/TranslationInterface'

/**
 * The romanian translation
 */
export const RomanianTranslation: Translation = {
    language: 'română',
    sidebar: {
        createSimulation: 'Creează o simulație',
        openSimulation: 'Deschide o simulație',
        logicGates: 'Porți logice',
        simulation: 'Simulație',
        language: 'Limba'
    },
    createSimulation: {
        mode: {
            question: 'Ce fel de simulație vrei să creezi?',
            options: {
                ic: 'Circuit integrat',
                project: 'Proiect'
            }
        },
        name: {
            question: 'Cum vrei să numești simulația?'
        }
    },
    actions: {
        save: 'Salvează',
        'delete selection': 'Șterge selecția',
        'select all': 'Selectează totul',
        clean: 'Curăță',
        refresh: 'Reîncarcă',
        undo: 'Întoarce',
        'delete simulation': 'Șterge simulația'
    },
    messages: {
        createdSimulation: name =>
            `Simulația '${name}' a fost creeată cu succes`,
        switchedToSimulation: name =>
            `Simulația '${name}' a fost deschisă cu succes`,
        savedSimulation: name => `Simulația '${name}' a fost salvată cu succes`,
        compiledIc: name => `Simulația '${name}' a fost compilată cu succes`,
        cleaned: name => `Simulația '${name}' a fost curățată cu succes`,
        refreshed: name => `Simulația '${name}' a fost reîncărcată cu succes`,
        undone: name => `Acțiunea a fost întoarsă`,
        deletedSimulation: name =>
            `Simulația '${name}' a fost ștearsă cu succes`
    }
}
