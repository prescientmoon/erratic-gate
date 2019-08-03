import { supportedLanguage } from './types/supportedLanguages'
import { Translation } from './types/TranslationInterface'
import { EnglishTranslation } from './translations/english'
import { RomanianTranslation } from './translations/romanian'
import { DutchTranslation } from './translations/nederlands'
import { MandarinTranslation } from './translations/chinese'
import { TurkishTranslation } from './translations/turkish'

/**
 * Object with all translations
 */
export const translations: Record<supportedLanguage, Translation> = {
    english: EnglishTranslation,
    ['română']: RomanianTranslation,
    dutch: DutchTranslation,
    ['中文']: MandarinTranslation,
    ['türkçe']: TurkishTranslation
}

export const allSupportedLanguages: supportedLanguage[] = [
    'english',
    'română',
    'dutch',
    '中文',
    'türkçe'
]
