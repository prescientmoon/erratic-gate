import { Translation } from '../types/TranslationInterface'

/**
 * The enaglish translation
 */
export const DeutschTranslation: Translation = {
    language: 'deutsch',
    sidebar: {
        createSimulation: 'Simulation erstellen',
        logicGates: ' Logische Tore',
        openSimulation: ' Simulationen öffnen ',
        simulation: 'Simulation',
        language: ' Sprache ',
        backToSimulation: ' Zurück zur Simulation',
        backToGates: ' Zurück zur Logische Tore'
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
            question: 'Was wollen Sie Ihre Simulation genannt werden?'
        }
    },
    actions: {
        save: 'Speichern',
        clean: 'Reinigen',
        refresh: 'Aktualisierung',
        undo: 'Rückgängig machen',
        paste: 'Einfügen',
        copy: 'Kopieren',
        duplicate: 'Duplizieren',
        cut: 'Schnitt',
        'select all': 'Wählen Sie Alle',
        'delete selection': 'Auswahl löschen',
        'delete simulation': 'Simulation löschen'
    },
    messages: {
        createdSimulation: name => `Erfolgreich erstellte Simulation '${name}'`,
        switchedToSimulation: name =>
            `Erfolgreich auf Simulation umgestellt '${name}'`,
        savedSimulation: name =>
            `Erfolgreich gespeicherte Simulation '${name}'`,
        compiledIc: name => `Erfolgreich kompilierte Schaltung '${name}'`,
        cleaned: name => `Erfolgreich bereinigte Simulation '${name}'`,
        refreshed: name => `Erfolgreich aktualisierte Simulation '${name}'`,
        undone: name => `Simulation erfolgreich rückgängig gemacht ' ${name}'`,
        deletedSimulation: name => `Simulation erfolgreich gelöscht ' ${name}'`,
        addedGate: name => `Tor erfolgreich hinzugefügt`
    }
}
