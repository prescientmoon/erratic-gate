import { supportedLanguages } from './types/supportedLanguages'
import { Translation } from './types/TranslationInterface'
import { EnglishTranslation } from './translations/english'
import { RomanianTranslation } from './translations/romanian'

/**
 * Object with all translations
 */
export const translations: Record<supportedLanguages, Translation> = {
    english: EnglishTranslation,
    ['română']: RomanianTranslation
}
