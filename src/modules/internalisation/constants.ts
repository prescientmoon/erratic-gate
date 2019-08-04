import { supportedLanguage } from './types/supportedLanguages'
import { Translation } from './types/TranslationInterface'
import { EnglishTranslation } from './translations/english'
import { RomanianTranslation } from './translations/romanian'
import { DutchTranslation } from './translations/nederlands'
import { MandarinTranslation } from './translations/chinese'
import { TurkishTranslation } from './translations/turkish'
import { DeutschTranslation } from './translations/deutsch'

/**
 * Object with all translations
 */
export const translations: Record<supportedLanguage, Translation> = {
    english: EnglishTranslation,
    ['română']: RomanianTranslation,
    dutch: DutchTranslation,
    ['中文']: MandarinTranslation,
    ['türkçe']: TurkishTranslation,
    deutsch: DeutschTranslation
}

export const allSupportedLanguages: supportedLanguage[] = [
    'english',
    'română',
    'dutch',
    '中文',
    'türkçe',
    'deutsch'
]
