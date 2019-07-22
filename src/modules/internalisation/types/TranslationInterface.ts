import { supportedLanguage } from './supportedLanguages'
import { simulationMode } from '../../saving/types/SimulationSave'

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
        language: string
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
    }
}
