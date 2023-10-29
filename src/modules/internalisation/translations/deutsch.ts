import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const DeutschTranslation: Translation = {
    language: 'deutsch',
    sidebar: {
        createSimulation: 'Simulation erstellen',
        logicGates: 'Logikgatter',
        openSimulation: 'Simulationen öffnen',
        simulation: 'Simulation',
        language: 'Sprache',
        backToSimulation: 'Zurück zur Simulation',
        backToGates: 'Zurück zu den Logikgattern'
    },
    createSimulation: {
        mode: {
            question: 'Welche Art von Simulation möchten Sie erstellen?',
            options: {
                ic: 'Integrierter Schaltkreis',
                project: 'Projekt'
            }
        },
        name: {
            question: 'Wie soll Ihre Simulation genannt werden?'
        }
    },
    actions: {
        save: 'Speichern',
        clean: 'Bereinigen',
        refresh: 'Aktualisieren',
        undo: 'Rückgängig machen',
        paste: 'Einfügen',
        copy: 'Kopieren',
        duplicate: 'Duplizieren',
        cut: 'Ausschneiden',
        'select all': 'Alles auswählen',
        'delete selection': 'Auswahl löschen',
        'delete simulation': 'Simulation löschen'
    },
    messages: {
        createdSimulation: name => `Simulation '${name}' erfolgreich erstellt`,
        switchedToSimulation: name =>
            `Erfolgreich zu Simulation '${name}' gewechselt`,
        savedSimulation: name =>
            `Simulation '${name}' erfolgreich gespeichert`,
        compiledIc: name => `Integrierter Schaltkreis '${name}' erfolgreich kompiliert`,
        cleaned: name => `Simulation '${name}' erfolgreich bereinigt`,
        refreshed: name => `Simulation '${name}' erfolgreich aktualisiert`,
        undone: name => `Simulation '${name}' erfolgreich Rückgängig gemacht`,
        deletedSimulation: name => `Simulation '${name}' erfolgreich gelöscht`,
        addedGate: name => `Logikgatter erfolgreich hinzugefügt`
    }
}
