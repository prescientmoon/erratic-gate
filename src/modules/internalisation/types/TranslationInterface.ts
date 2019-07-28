import { supportedLanguage } from './supportedLanguages'
import { simulationMode } from '../../saving/types/SimulationSave'
import { possibleAction } from '../../simulation-actions/types/possibleAction'

export type SentenceFactory<T extends string[]> = (...names: T) => string
export type NameSentence = SentenceFactory<[string]>

/**
 * The interface all translations need to follow
 */
export interface Translation {
    language: supportedLanguage
    sidebar: {
        createSimulation: string
        openSimulation: string
        logicGates: string
        simulation: string
        language: string
        backToSimulation: string
    }
    createSimulation: {
        mode: {
            question: string
            options: Record<simulationMode, string>
        }
        name: {
            question: string
        }
    }
    messages: {
        createdSimulation: NameSentence
        switchedToSimulation: NameSentence
        savedSimulation: NameSentence
        compiledIc: NameSentence
        refreshed: NameSentence
        cleaned: NameSentence
        undone: NameSentence
        deletedSimulation: NameSentence
        addedGate: NameSentence
    }
    actions: Record<possibleAction, string>
}
