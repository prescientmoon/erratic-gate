import { CurrentLanguage } from '../stores/currentLanguage'
import { allSupportedLanguages } from '../constants'

/**
 * Changes the language to the next one avabile
 */
export const nextLanguage = () => {
    const current = CurrentLanguage.get()
    const index = allSupportedLanguages.indexOf(current)

    CurrentLanguage.set(
        allSupportedLanguages[(index + 1) % allSupportedLanguages.length]
    )
}
