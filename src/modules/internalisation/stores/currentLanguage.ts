import { supportedLanguage } from '../types/supportedLanguages'
import { LocalStore } from '../../storage/classes/LocalStore'
import currentLanguageSubject from './../subjects/currentLanguageSubject'
import { SimulationError } from '../../errors/classes/SimulationError'
import { translations } from '../constants'

/**
 * Local store containing the current selected language
 */
export const CurrentLanguageLocalStore = new LocalStore<supportedLanguage>(
    'language'
)

// This makes sure the language isnt undefined
if (!CurrentLanguageLocalStore.get()) {
    CurrentLanguageLocalStore.set('english')
}

currentLanguageSubject.next(CurrentLanguageLocalStore.get() || 'english')

/**
 * The preffered interface for interacting with CurrentLanguageLocalStore
 */
const CurrentLanguage = {
    set(name: supportedLanguage) {
        CurrentLanguageLocalStore.set(name)
        currentLanguageSubject.next(name)
    },

    /**
     * Used to get the current selected store
     *
     * @throws SimulationError if the language cannot be found
     */
    get() {
        const language = CurrentLanguageLocalStore.get()

        if (!language) {
            throw new SimulationError(`Current language not found`)
        }

        return language
    },

    /**
     * Helper to get the current translation outside React components
     */
    getTranslation() {
        return translations[CurrentLanguage.get()]
    }
}

export { CurrentLanguage }
